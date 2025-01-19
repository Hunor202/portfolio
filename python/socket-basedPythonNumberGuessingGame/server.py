from socket import socket, AF_INET, SOCK_STREAM
from select import select
import struct
import sys
import random

random_number = random.randint(1, 100)

server_addr = (sys.argv[1], int(sys.argv[2]))

packer1 = struct.Struct("c i")
packer2 = struct.Struct("10s")

over = False
res = packer2.pack(b"Igen")

print(random_number)

with socket(AF_INET, SOCK_STREAM) as server:
    inputs = [ server ]
    server.bind(server_addr)
    server.listen(500)
    
    while True:
        timeout = 1
        r, w, e = select(inputs, inputs,inputs,timeout)
        
        if not (r or w or e):
            continue
        
        for s in r:
            if s is server:
                client, client_addr = s.accept()
                inputs.append(client)
                print("Csatlakozott:",client_addr)
                if(over):
                    res = packer2.pack(b"Vege")
                    pass
                else:
                    if(over):
                        res = packer2.pack(b"Kistel")
                        pass
                    else:
                        data = s.recv(packer1.size)
                        if not data:
                            inputs.remove(s)
                            s.close()
                            print("kliens kilepett")
                        else:
                            c, num = packer1.unpack(data)
                            print(c)
                            print(num)
                            if(c == ">"):
                                if(random_number > num):
                                    print("A")
                                    #res = packer2.pack(b"Igen")
                                else:
                                    print("B")
                                    #res = packer2.pack(b"Nem")
                            if(c == "=" and random_number == num):
                                pass
                               # res = packer2.pack(b"Nyertel")
                    print(res)
                    s.sendall(res)