import json
import requests

BASE_URL = "http://127.0.0.1:8000/api/v1/inspire"

CASES = [
    {"creative_mode": "visual",   "user_input": "ice"},
    {"creative_mode": "musical",  "user_input": "melancholy"},
    {"creative_mode": "writer",   "user_input": "a detective who can't remember the crime they solved"},
]


def run():
    for payload in CASES:
        mode = payload["creative_mode"].upper()
        print(f"\n{'='*50}")
        print(f"  MODE: {mode}  |  input: \"{payload['user_input']}\"")
        print(f"{'='*50}")
        try:
            response = requests.post(BASE_URL, json=payload, timeout=10)
            response.raise_for_status()
            print(json.dumps(response.json(), indent=2, ensure_ascii=False))
        except requests.exceptions.ConnectionError:
            print("ERROR: Could not connect. Is the server running?  ->  uvicorn app.main:app --reload")
        except requests.exceptions.HTTPError as e:
            print(f"HTTP {e.response.status_code}: {e.response.text}")


if __name__ == "__main__":
    run()
