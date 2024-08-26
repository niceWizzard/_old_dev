import requests
from function import getFullName, randomNum, startThread

url = 'https://www.colourkeep.com/step3.php'


def Start():
    while True:
        data = {
            "shipping_fname": getFullName().replace(' ', ''),
            "shipping_phone": str(randomNum())
        }
        res = requests.post(url, data=data)
        output = ''
        if res.status_code == 200:
            output += ("DONE!")
        else:
            output += ("ERROR")
        print(output, res.status_code)


startThread(100, Start)
