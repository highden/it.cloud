var answer = prompt ( 'Кто пришел?' );
if (answer === "Админ") {
	var another = prompt ( 'Пароль?' );
	if (another === "Черный властелин") {
		alert ( "Добро пожаловать" );
	} else if (another === null) {
		alert ( "Вход отменен" );
	} else {
	alert( "Пароль неверен" );
	}
} else if (answer === null) {
	alert( "Вход отменен" );
} else {
	alert( "Я вас не знаю" );
}
