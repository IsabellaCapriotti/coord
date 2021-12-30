from flask import Flask, request, make_response
from flask_cors import CORS
from bs4 import BeautifulSoup
import requests
import pymongo
from decouple import config
import urllib
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
import certifi

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
