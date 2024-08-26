
# ----------------------------------------------- Unsucessfull -------------------------------


first = json.loads(open('json/first.json').read())
last = json.loads(open('json/names.json').read())


def GetLoop():
    sentNum = 0
    while True:
        phone = str(randomNum(11, ''))
        fullname = fullName(first, last).replace(' ', '')
        url = 'https://lomdaret.com/pages/ok-philipines?name=' + fullname + '&phone=' + phone
        res = requests.get(url)
        if res.status_code == 200:
            print('✅', 'GOT IT!', sentNum)
        else:
            print('❌', sentNum, res.status_code)
        sentNum += 1


startThread(50, GetLoop)
