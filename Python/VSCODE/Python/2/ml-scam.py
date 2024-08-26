import os
import time
import requests

from function import getRandomFullName, randomNum, startThread
from threading import Lock, Thread


# url = "https://muamail.online/32login.php"
url = "https://coodaadmnew2022.my.id/id-id/mobile-legends/verification.php"

data = {
    "email": "Yourmama",
    "password": "lasjdf",
    "login": "Facebook",
}

mutex = Lock()



successful = 0
failed = 0
activeThreads = 0
recent = ""
shouldStop = False
pings_cached = []
average_ping = 0

def post():
    global successful
    global failed
    global recent
    global shouldStop
    global activeThreads
    
    mutex.acquire()
    activeThreads+=1
    mutex.release()
    while not shouldStop:
        name = getRandomFullName().replace(" ", "").lower()
        emailWithoutDomain = name + randomNum(2, "")
        email = emailWithoutDomain + "@gmail.com"
        password = name + randomNum(2, "")

        data["password"] = password
        data["email"] = email
        res = requests.post(url, data=data);

        mutex.acquire()
        elapsedMs = res.elapsed.microseconds / 1000
        pings_cached.append(elapsedMs)

        if(res.status_code == 200):
            recent = f"✅ Sent {str(data)}"
            successful += 1
        else:
            recent = f"❌ \n Status: {res.status_code}\n Text: {res.text}";
            failed += 1
            shouldStop = True
        mutex.release()
    mutex.acquire()
    activeThreads -= 1
    mutex.release()

def draw():
    global url
    global successful
    global failed
    global recent
    global average_ping
    while True:
        total = 0
        for p in pings_cached:
            total += p
        average_ping = total / max(len(pings_cached), 1)
        pings_cached.clear()
        os.system("CLS")
        print(f"Spamming: {url}")
        print(f"Ping: {round(average_ping)}ms Threads: {activeThreads}")
        print(f"Successful: {successful}")
        print(f"Failed: {failed}")
        print(f"Recent: {recent}")
        time.sleep(0.5)



Thread(target=draw).start()

startThread(25, post);
