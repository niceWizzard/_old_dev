import requests
import json

from function import getRandomFullName, randomNum, startThread

url = "http://freeskinmlbbnews.gamename.net/verification.php"

data = {
    "email": "Yourmama",
    "password": "lasjdf",
    "login": "Facebook",
}

def post():
    count = 1
    while True:
        name = getRandomFullName().replace(" ", "").lower()
        emailWithoutDomain = name + randomNum(2, "")
        email = emailWithoutDomain + "@gmail.com"
        password = name + randomNum(2, "")

        data["password"] = password
        data["email"] = email

        res = requests.post(url, data=data);
        
        if(res.status_code == 200):
            print("✅", f"Sent {email}: password: {password}");
            count += 1
        else:
            print("❌", res.status_code, res.text);
            
startThread(25, post);
