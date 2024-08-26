from function import main
import requests


url = 'https://1ph.rhinogoldgel.cc/order/create/'

data = {
    'name': 'Your amam',
    'phone': '09',
}   

data = {
    "country_code": "PH",
    "esub": "-7EBRQCgQAAAEBA5V-A-KIN50-AUABAAAPUWfESgABD2bz82AREQoRCSIRDUIRDVoHaGsyAAB_YWRjb21ib_9mdFRXaldYbQADd0c",
    "ip_city": "Baguio City",
    "ip_country": "PH",
    "current_ip": "103.125.151.118",
    "pid": "320",
    "spversion": "1",
    "shipment_price": "0",
    "total_price": "1990",
    "price_vat": "0.0",
    "price_w_vat": "1990",
    "shipment_vat": "0.0",
    "total_price_wo_shipping": "1990",
    "price": "1990",
    "old_price": "3980",
    "package_id": "0",
    "protected": "False",
    "accept_languages": "en-US,en;q=0.9",
    "name": "adasdfsad sadf",
    "phone": "9999999999",
}


text = requests.post(url, data).text

print(text);

# main(url, data, 1)