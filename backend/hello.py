from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/dummy", methods=["GET"])
def get_dummy():
    return jsonify([{ "description": "dummy", "data": 1 }])

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
