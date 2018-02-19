var role = prompt ('Ты кто?');
var message = ( role === "Гость" ? "Привет" : 
	role === "Директор" ? "Здравствуйте" : 
		role === ""  ? "Познакомимся?" : "" );
alert(message);