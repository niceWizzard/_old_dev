import requests
from function import *



url = "https://newsearnmoney.com/lQAmzdxE"



def GetReq():
    iteration = 0
    while True:
        req = requests.get(url)
        if(req.status_code != 200):
            print("Failed with status of: {req.status_code} at iteration of: {iteration} ")
            break;
        print(f"Iteration: {iteration} Status: {req.status_code} ")
        iteration += 1  

def main():
    threadCount = 50
    startThread(threadCount, GetReq)


main()




