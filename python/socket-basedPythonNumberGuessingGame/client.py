from socket import socket, AF_INET, SOCK_STREAM
import struct
import sys
import time
import math

server_addr = (sys.argv[1], int(sys.argv[2]))
number_pool = list(range(1, 101))
packer1 = struct.Struct("c i")
packer2 = struct.Struct("10s")
num = 50
c = ">"
data = packer1.pack(c.encode(), num)
clean_msg = ""

with socket(AF_INET, SOCK_STREAM) as client:
    client.connect(server_addr)
    while(True):
        print(num)
        if(len(number_pool) == 1):
            c = "="
        data = packer1.pack(c.encode(), num)
        client.sendall(data)
        result = client.recv(packer2.size)
        msg = packer2.unpack(result)
        clean_msg = msg[0].rstrip(b'\x00').decode('utf-8')
        if(clean_msg == "Nyertel"):
            print("Nyertem")
            client.close()
            break
        if(clean_msg == "Kiestel"):
            print("Kiestem")
            client.close()
            break
        if(clean_msg == "Vege"):
            print("Vegem")
            client.close()
            break
        
        if(clean_msg == "Igen"):
            number_pool = number_pool[1+number_pool.index(num):]
        else:
            number_pool = number_pool[:number_pool.index(num)+1]
        print(clean_msg)
        print(number_pool)
        time.sleep(1)
        num = number_pool[math.floor(len(number_pool)/2)]
        if(len(number_pool) == 2 and clean_msg == "Nem"):
            num = number_pool[0]