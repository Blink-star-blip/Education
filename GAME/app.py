from flask import Flask, render_template, request, jsonify
import json
import random

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
    difficulty = data.get("difficulty", "Средний")

    if topic not in questions_data:
        return jsonify({"error": "Тема не найдена"}), 400

    questions = [q for q in questions_data[topic] if q["difficulty"] == difficulty]
    questions = random.sample(questions_data[topic], min(5, len(questions)))
    return jsonify(questions)


if __name__ == "__main__":
    app.run(debug=True)
