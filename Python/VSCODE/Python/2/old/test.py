import requests
import random
from function import getFullName, randomNum, getCity, startThread

url = 'https://www.acusteps-promo.com/cart/buynow'

data = {
    "pid": "65",
    "campaign_uri": "288605",
    "order_data": ""
}


fullName = getFullName().replace(' ', '')
phone = randomNum(9)
city = getCity().replace(' ', '')
zip = random.randint(400, 9811)

data['order_data'] = f"courier_note=2+%2B+1+AcuSteps+(%E2%82%B1%C2%A03980)&first_name={fullName}%s&address=mama&city={city}&zip={zip}&phone={phone}"
res = requests.post(url,  data=data)

print(res.text, res.status_code)
