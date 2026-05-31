import requests
data = {
    "roomName": "",
    "description": "HI bye",
    "roomCode": "",
    "completionTime": 60,
    "difficulty": "Medium",
    "cloning": False,
    "visibility": "Private",
    "privateMessage": "",
    "bannerUrl": "",
    "avatarUrl": "",
    "video1": None,
    "video2": None,
    "tasks": [
        {
            "title": "New Task",
            "description": "",
            "questions": [
                {
                    "text": "Hi",
                    "answer": "BYE",
                    "points": 10
                }
            ]
        }
    ],
    "categories": []
}
r = requests.post('http://127.0.0.1:5000/api/create_room', json=data)
print(r.status_code)
print(r.text)
