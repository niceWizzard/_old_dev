import requests
import threading
import json
import random


def randomNum(length=9, startingNum='09'):
    output = startingNum
    for i in range(length):
        output += str(random.randint(0, 9))
    return output


def randomFullName(first, last):
    one = random.randint(0, len(first) - 1)
    two = random.randint(0, len(last) - 1)
    output = first[one] + ' ' + last[two]
    return output


def getCity():
    city = json.loads(open('json/city.json').read())
    one = randomNum(0, len(city) - 1)
    return city[one]


firstNames = json.loads(open('json/first.json').read())
lastNames = json.loads(open('json/names.json').read())
baranggay = json.loads(open('json/baranggay.json').read())


def getRandomFullName():
    return randomFullName(firstNames, lastNames)


def getEmail():
    subdomain = ['%40gmail.com', '%40yahoo.com', '%40email.com']
    name = (getRandomFullName().replace(' ', '').lower())
    if(random.randint(0, 1) == 1):
        name += randomNum(random.randint(0, 4), '')
    output = name + subdomain[random.randint(0, len(subdomain) - 1)]
    return output


def getAdress(city):
    street = ['1st Street', '2nd Street', 'Main Street',
              'Mambang', 'Morayta Street', '4th Street']
    output = street[random.randint(0, len(
        street) - 1)] + baranggay[random.randint(0, len(baranggay) - 1)] + city
    return output


def startThread(threadNumber, targetFunction):
    num = threadNumber
    threads = []
    for i in range(num):
        t = threading.Thread(target=targetFunction)
        t.daemon = True
        threads.append(t)
    for i in range(num):
        threads[i].start()
    for i in range(num):
        threads[i].join()


def main(url, data, threadNumber=50):
    def doReq():
        sent = 1
        newData = data
        firstNames = json.loads(open('json/first.json').read())
        lastNames = json.loads(open('json/names.json').read())
        while True:
            newData['Lead[name]'] = randomFullName(firstNames, lastNames)
            newData['Lead[phone]'] = randomNum(9)
            print('⌛ ', 'sending',
                  newData['Lead[name]'], newData['Lead[phone]'])
            response = requests.post(url, data=data)
            if response.status_code == 200:
                print('✅', 'Sent Successfully ', sent)
            else:
                print('❌', sent, 'Sent Failed | Status Code: ',
                      response.status_code)
            sent += 1

    print('Sending Data to:', url)
    startThread(threadNumber, doReq)
