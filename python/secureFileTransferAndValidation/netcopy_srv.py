from socket import socket, AF_INET, SOCK_STREAM
import sys
import hashlib

length = 0
m = hashlib.md5()
server_addr = (sys.argv[1], int(sys.argv[2]))
ch_server_addr = (sys.argv[3], int(sys.argv[4]))
file_id = int(sys.argv[5])
file = sys.argv[6]

with socket(AF_INET,SOCK_STREAM) as server:
	server.bind(server_addr)
	server.listen(1)
	
	client, client_addr = server.accept()
	end = False
	with open(file, "wb") as f: #binĂĄris mĂłdban nyitjuk meg
		while not end:
			data = client.recv(4000)
			if data:
				m.update(data)
				length = len(data)
				f.write(data)
				#print("Sikerult")
			else:
				client.close()
				end = True
with socket(AF_INET, SOCK_STREAM) as client:				
	client.connect(ch_server_addr)
	msg = "KI|" + str(file_id)
	client.sendall(msg.encode())
	data = client.recv(4000)
	#print(data.decode())
	tokens = data.decode().split('|')
	if(length == int(tokens[0]) and str(m.hexdigest()) == tokens[1]):
		print("CSUM OK")
	else:
		print("CSUM CORRUPTED")

#print("Vege")