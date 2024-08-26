from hashlib import new
import requests;
from function import *


data = {
    "landing":  "//toxi.bestshops.info/ph/toxicoff/1108/",
    "name":  "ladfskjlkdfas",
    "phone":  "012341231234"
}

num = "110";

def get_link(num):
    link = f"https://toxi.bestshops.info/ph/toxicoff/{num}/lead.php"
    return link;

def get_landing(num):
    return f"//toxi.bestshops.info/ph/toxicoff/{num}/"

def getLinkId():
    return num + str(random.randint(3, 8));

def mutateData(_data, num):
    _data["phone"] = randomNum();
    _data["name"] = getRandomFullName()
    _data["landing"] = get_landing(num)

def startSend():
    global data
    while True:
        newNum = getLinkId()
        mutateData(data, newNum)
        res = requests.post(get_link(newNum), data=data);
        sent =  data["name"] + " " +  data["phone"]
        if(res.status_code == 200):
            print('✅', sent)
        else:
            print('❌', sent, 'ERROR: ||', res.status_code)




startThread(2, startSend)


