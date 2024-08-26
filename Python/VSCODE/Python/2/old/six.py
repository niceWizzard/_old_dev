import requests
from function import getFullName, randomNum, startThread

url = 'https://order.drcash.io/order/js'

data = {
    "client": {
        "name": getFullName().replace(' ', ''),
        "phone": randomNum(9)
    }
}


def start():
    while True:
        res = requests.post(url,  json=data)
        if(res.status_code == 200):
            print("Success")
        else:
            print('ERROR: ', res.status_code)


startThread(50, start)
