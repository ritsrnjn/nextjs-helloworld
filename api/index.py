from flask import Flask, jsonify
# import cors
from flask_cors import CORS

app = Flask(__name__)
# enable cors
CORS(app)

@app.route("/api/python")
def hello_world():
    print("Request received!")
    # return json response
    return jsonify({"message": "Hello Ritesh!"})
