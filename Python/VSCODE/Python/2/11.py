import requests
from function import getRandomFullName, startThread, randomNum;


url = "https://ph.upsize.website/artikulo/59_paano%20upang%20palakihin%20ang%20dibdib%20sa%20bahay%20ng%20babae";

data = {
    "p_5399__gky": "adadsf",
    "landing": "ph.upsize.website",
    "country": "ph",
    "referrer": "https://www.google.com/",
    "pmdcsi_2799__iifqqck": "121213213124",
}

def post():
    while True:
        number = randomNum()
        name = getRandomFullName()
        data["pmdcsi_2799__iifqqck"] = number
        data["p_5399__gky"] = name

        res = requests.post(url, data=data);
        if(res.status_code == 200):
            print("✅", f"Sent {name}: {number}");
        else:
            print("❌", res.status_code, res.text);


startThread(100, post);



