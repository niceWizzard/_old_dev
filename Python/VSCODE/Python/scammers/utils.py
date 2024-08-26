import threading


def startThread(threadNumber, targetFunction,threads=[]):
    num = threadNumber
    for i in range(num):
        t = threading.Thread(target=targetFunction)
        t.daemon = True
        threads.append(t)
    for i in range(num):
        threads[i].start()
    for i in range(num):
        threads[i].join()

