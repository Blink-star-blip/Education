from flask import Flask, render_template, request, jsonify
import json
import random
from os import environ


app = Flask(__name__)


with open("questions.json", encoding="utf-8") as f:
    questions_data = json.load(f)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/get_questions", methods=["POST"])
def get_questions():
    data = request.json
    topic = data.get("topic")

    if topic not in questions_data:
        return jsonify({"error": "Тема не найдена"}), 400

    questions = random.sample(questions_data[topic], min(5, len(questions_data[topic])))
    return jsonify(questions)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(environ.get("PORT", 5000)))
