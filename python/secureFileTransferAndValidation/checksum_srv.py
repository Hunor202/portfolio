from socket import socket, AF_INET, SOCK_STREAM
from select import select
import sys

server_addr = (sys.argv[1], int(sys.argv[2]))
files = {}

with socket(AF_INET, SOCK_STREAM) as server:
    inputs = [ server ]
    server.bind(server_addr)
    server.listen(500)
    
    while True:
        timeout = 1
        r, w, e = select(inputs, inputs, inputs, timeout)
        
        if not (r or w or e):
            continue
        for s in r:
            if s is server:
                client, client_addr = s.accept()
                inputs.append(client)
                #print("Csatlakozott:",client_addr)
            else:
                data = s.recv(4000)
                if not data:
                    inputs.remove(s)
                    s.close()
                    #print("kliens kilepett")
                else:
                    decoded_data = data.decode()
                    msg = decoded_data.split('|')
                    #print(msg[0])
                    if(msg[0] == "BE"):
                        files[int(msg[1])] = (int(msg[2]), int(msg[3]), msg[4]) 
                        #print(files)
                        s.sendall(b"ok")
                    if(msg[0] == "KI"):
                        m = "0|"
                        if(int(msg[1]) in files):
                            m = str(files[int(msg[1])][1]) + "|" + files[int(msg[1])][2]
                        s.sendall(m.encode())