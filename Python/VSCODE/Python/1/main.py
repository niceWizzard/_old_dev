import requests
import threading

url = ''

data = {


}


def doReq():
    sent = 1
    while True:
        print('sending', sent)
        response = requests.post(url, data=data)
        if response.text:
            print(sent, 'Sent Successfully')
        sent += 1


num = 1
threads = []


for i in range(num):
    t = threading.Thread(target=doReq)
    t.daemon = True
    threads.append(t)

for i in range(num):
    threads[i].start()

for i in range(num):
    threads[i].join()
