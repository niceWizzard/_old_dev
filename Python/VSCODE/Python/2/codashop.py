from math import e
from os import stat 
import requests
from time import sleep

from function import getEmail, getRandomEmailPassword, startThread

verification_path = "id/mobile-legends/verification.php";
first_url = "http://codashopmlbbxz.duckdns.org/id/mobile-legends/verification.php"
third_url = "https://nowitwmm3-event.cf/verification.php"
url = f"https://nowitwmm3-eventz.cf/{verification_path}"


data = {
    "email": "dafasdf",
    "password": "sadfsdaf",
    "login": "Facebook",
    "nickname": "",
    "userIdForm": "",
    "zonaIdForm":"",
}

res = requests.post(url=url, data=data)

def main():
    counter = 0
    while True:
        e = getRandomEmailPassword()
        data["email"] = e[0]
        data["password"] = e[1]
        res = requests.post(url=url, data=data);
        if(res.status_code == 200):
            print("✅",counter ,f"Sent {e[0]} with password: {e[1]}");
            sleep(0.025)
            counter += 1
        else:
            print("❌", res.status_code, res.text)
            break;



startThread(50, main)


