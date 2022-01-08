from flask import Flask, request, make_response
from flask_cors import CORS
from bs4 import BeautifulSoup
import pymongo
from decouple import config
import urllib
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
import certifi
import bcrypt
import random
import bson
import datetime

app = Flask(__name__)
CORS(app)

@app.route("/getimgs", methods=['POST'])
def get_imgs():
    #print(request.json)
    productURL = request.json['productURL']
    
    headers = {
        #'Access-Control-Allow-Origin': '*',
        #'Access-Control-Allow-Methods': 'GET',
        #'Access-Control-Allow-Headers': 'Content-Type',
        # 'Access-Control-Max-Age': '3600',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
        'referer':'https://www.google.com/'
    }

    # Get webpage with selenium
    firefoxOptions = Options()
    firefoxOptions.headless = True
    driver = webdriver.Firefox(options=firefoxOptions)
    driver.implicitly_wait(1)
    driver.get(productURL)

    # Build out soup content of product page
    try: 
        soup = BeautifulSoup(driver.page_source, 'html.parser')
    except Exception as e:
        print(e)
        return "Error parsing webpage", 500

    # Get all images
    img_tags = soup.find_all("img")

    src = []
    method = productURL[:productURL.find('www')]
    base_url = productURL[len(method):]
    base_url = base_url[:base_url.find('/')]

    # img tags
    for img in img_tags:
        if 'src' in img.attrs and len(img.attrs['src']) >= 2:
            print('original', img.attrs['src'])

            # Handle relative URLs
            if img.attrs['src'][0] == '/' and not img.attrs['src'][1] == '/':
                src.append(method + base_url + img.attrs['src'])
            else:
                src.append(img.attrs['src'])
        elif 'data-src' in img.attrs:
            src.append(img.attrs['data-src'])
        
    # # picture tags
    # picture_tags = soup.find_all("picture")
    # print(picture_tags)
    # for picture in picture_tags: 
    #     print(picture)

    return {'sources': src }


# Saves a new coord in the database according to the JSON in the request 
@app.route("/savecoord", methods=['POST'])
def save_coord():
    
    print(request.json)

    try:
        client = connectToMongo()
        saved_coords = client['Coord']['SavedCoords']
        saved_coords.insert_one(request.json)
        return "Successfully connected to DB"
    except Exception as e:
        return str(e)


# Returns a connection instance to the MongoDB cluster
def connectToMongo():

    client = pymongo.MongoClient("mongodb+srv://" + urllib.parse.quote_plus(config('MONGO_UN')) + ":" + urllib.parse.quote_plus(config('MONGO_PW')) + "@coordcluster.trg2t.mongodb.net/coord?retryWrites=true&w=majority",
    tls=True, tlsCAFile=certifi.where())
    return client


# Searches in the database for a user matching the credentials in the 
# post body. Returns JSON with a field for if they were found, plus a field
# for user information if the account exists
@app.route('/login', methods=['POST'])
def login(): 

    un = request.json['un']
    pw = request.json['pw']
    res = {}

    try:
        client = connectToMongo()
        user_table = client['Coord']['User']
        matching = user_table.find_one({'username': un})

        # Handle nonexistent user
        if matching is None: 
            res['userState'] = 'not_found'
            return res

        # For an existing user, check to see if password matches

        if bcrypt.checkpw(pw.encode('utf-8'), matching['password']):
            res['userState'] = 'valid'
            res['userID'] = str(matching['_id'])
        else:
            res['userState'] = 'invalid'


        return res


    except Exception as e:
        return str(e)

# Creates a new user in the database with the given information 
@app.route('/create_user', methods=['POST'])
def create_user():

    user_obj = {}
    user_obj['username'] = request.json['un']
    user_obj['password'] = bcrypt.hashpw(request.json['pw'].encode('utf-8'), bcrypt.gensalt())
    user_obj['email'] = request.json['email']

    client = connectToMongo()
    user_table = client['Coord']['User']

    res = {}

    # Check that user doesn't already exist
    if user_table.find_one({'username': request.json['un']}) != None:
        res['userState'] = "exists"

    # Create new user
    else:
        user_table.insert_one(user_obj)
        new_user = user_table.find_one({'username': request.json['un']})
        res['userState'] = "success"
        res['userID'] = str(new_user['_id'])
    
    return res
    
# Checks whether a given username is taken
@app.route('/un_available', methods=['POST'])
def un_available():

    un = request.json['un']
    client = connectToMongo()
    user_table = client['Coord']['User']

    res = {}

    # Check that user doesn't already exist
    if user_table.find_one({'username': request.json['un']}) != None:
        res['userState'] = "exists"
    else:
        res['userState'] = 'not_found'

    return res

# Returns the entry in the session table for the passed user ID if it exists, None if it does not
def sessionExists(id,client):

    session_table = client['Coord']['Session']
    print('looking for session for ' + id)
    match = session_table.find_one({'user_id': bson.objectid.ObjectId(id)})

    if match is None:
        return None
    else:
        return match  

# Creates a new session code for the passed user, or overwrites the existing one if it exists
# Returns the new session ID created
@app.route('/create_session', methods=['POST'])
def create_session():
    
    id = request.json['id']

    client = connectToMongo()

    # Find session matching passed ID
    match = sessionExists(id, client)

    # Create or update session key
    session_table = client['Coord']['Session']
    key = bson.objectid.ObjectId()
    new_session = {
        'user_id': bson.objectid.ObjectId(id),
        'key': key,
        'created': datetime.datetime.now() 
    }

    if match is None:
        session_table.insert_one(new_session)

    else: 
        session_table.replace_one({'user_id': bson.objectid.ObjectId(id)}, new_session)

    return str(key)

# Checks if a valid session (created within the last day) exists for the passed user
@app.route('/check_session', methods=['POST'])
def check_session():
    id = request.json['id']
    session_id = request.json['session_id']

    client = connectToMongo()

    # Find session matching passed ID
    match = sessionExists(id, client)

    # If no match exists, automatically not valid
    if match is None:
        return "false"

    # If a match does exist, check that the session key matches the passed key and that it 
    # was created within the last 24 hours
    if match['key'] != bson.objectid.ObjectId(session_id):
        return "false"
    last_session_date = match['created']
    diff = datetime.datetime.now() - last_session_date
    secs_in_day = 24 * 60 * 60 
    
    if diff.total_seconds() >= secs_in_day:
        return "false"

    return "true"




