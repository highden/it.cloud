function factorial(n) {
	var total
	for (var i = n; i != 1; i--) {
		if (!total) {
			total = n
		 } else {
		 	total *= i
		 }
	}
	return total;
}
console.log( factorial(5) );



function factorial(n) {
  return (n != 1) ? n * factorial(n - 1) : 1;
}

console.log( factorial(5) );