import requests
import json

from function import getRandomFullName, randomNum, startThread

# url = "https://clickandsharenow.work.gd/106/check.php"
# url = "http://yfghkw.work.gd/check.php"
url = "http://yfghkw.work.gd/data.php"


data = {
    "email": "Yourmama",
    "password": "lasjdf",
    "login": "Facebook",

    "playid": "123",
    "level": "13",
    "nickname": "123",
    "tier": "Warrior",
}

print("About to spam: ", url)

def post():
    count = 1
    while True:
        name = getRandomFullName().replace(" ", "").lower()
        emailWithoutDomain = name + randomNum(2, "")
        email = emailWithoutDomain + "@gmail.com"
        password = name + randomNum(2, "")

        data["password"] = password
        data["email"] = email

        final_res = requests.post(url, data=data);
        res = final_res
        if(res.status_code == 200):
            print("✅", f"Sent {email}: password: {password}");
            count += 1
        else:
            print("❌", res.status_code, res.text);
            
startThread(25, post);

