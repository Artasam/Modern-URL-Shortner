from flask import Flask, request, redirect, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import random
import string
import os

app = Flask(__name__)
# Enable CORS so our frontend can communicate with the backend
CORS(app)

# Handle Render/PythonAnywhere environment specifics
basedir = os.path.abspath(os.path.dirname(__file__))
default_db = 'sqlite:///' + os.path.join(basedir, 'urls.db')

database_url = os.getenv('DATABASE_URL', os.getenv('DATABASE_URI', default_db))
if database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)

app.config['SQLALCHEMY_DATABASE_URI'] = database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Urls(db.Model):
    id_ = db.Column("id_", db.Integer, primary_key=True)
    long = db.Column("long", db.String())
    short = db.Column("short", db.String(3))

    def __init__(self, long, short):
        self.long = long
        self.short = short

with app.app_context():
    db.create_all()

def shorten_url():
    letters = string.ascii_lowercase + string.ascii_uppercase
    while True:
        rand_letters = random.choices(letters, k=3)
        rand_letters = "".join(rand_letters)
        short_url = Urls.query.filter_by(short=rand_letters).first()
        if not short_url:
            return rand_letters

@app.route('/api/shorten', methods=['POST'])
def shorten():
    data = request.get_json()
    if not data or 'long_url' not in data:
        return jsonify({'error': 'long_url is required'}), 400
    
    url_received = data['long_url']
    found_url = Urls.query.filter_by(long=url_received).first()

    if found_url:
        return jsonify({'short_url': found_url.short, 'long_url': found_url.long}), 200

    short_url = shorten_url()
    new_url = Urls(url_received, short_url)
    db.session.add(new_url)
    db.session.commit()
    
    return jsonify({'short_url': short_url, 'long_url': url_received}), 201

@app.route('/')
def index():
    return jsonify({'status': 'URL Shortener API is running smoothly!'}), 200

@app.route('/api/urls', methods=['GET'])
def get_all_urls():
    urls = Urls.query.all()
    return jsonify([{'short_url': u.short, 'long_url': u.long} for u in urls]), 200

@app.route('/<short_url>')
def redirection(short_url):
    long_url = Urls.query.filter_by(short=short_url).first()
    if long_url:
        return redirect(long_url.long)
    else:
        return jsonify({'error': 'URL not found'}), 404

if __name__ == '__main__':
    app.run(port=5000, debug=True)