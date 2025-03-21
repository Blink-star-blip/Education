import json
with open("questions.json", encoding="utf-8") as f:
    data = json.load(f)
print("JSON корректный:", data.keys())