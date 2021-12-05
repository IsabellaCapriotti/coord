from flask import Flask, request, make_response
from flask_cors import CORS
from bs4 import BeautifulSoup
import requests

app = Flask(__name__)
CORS(app)

@app.route("/getimgs", methods=['POST'])
def get_imgs():
    #print(request.json)
    productURL = request.json['productURL']
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '3600',
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0'
    }

    # Build out soup content of product page
    try: 
        html_content = requests.get(productURL, headers)
        soup = BeautifulSoup(html_content.content, 'html.parser')
        #print(soup.prettify())
    except:
        return "Error parsing webpage", 500

    # Get all images
    img_tags = soup.find_all("img")
    #print(img_tags)

    src = []

    for img in img_tags:
        #print(img.attrs)
        if 'src' in img.attrs:
            src.append(img['src'])
        elif 'data-src' in img.attrs:
            src.append(img['data-src'])
        

    return {'sources': src }

