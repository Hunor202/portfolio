from socket import socket, AF_INET, SOCK_STREAM
import sys
import hashlib

m = hashlib.md5()
server_addr = (sys.argv[1], int(sys.argv[2]))
ch_server_addr = (sys.argv[3], int(sys.argv[4]))
file_id = int(sys.argv[5])
file = sys.argv[6]

with socket(AF_INET, SOCK_STREAM) as client:
	with open(file, "rb") as f:
		client.connect(server_addr)
		data = f.read()
		client.sendall(data)
		client.close()
		client = socket(AF_INET, SOCK_STREAM)
		client.connect(ch_server_addr)
		m.update(data)
		msg = "BE|" + str(file_id) + "|60|" + str(len(data)) + "|" + str(m.hexdigest())
		client.sendall(msg.encode())
		a = client.recv(4000)