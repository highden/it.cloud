function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

do {
	var a = randomInteger(10, 20);
	var b = randomInteger(10, 20);

	var answer = +prompt (a + "+" + b);
} while (answer !== (a + b));
alert ("Верно");