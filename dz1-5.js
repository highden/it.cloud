var fib = [0,1]; 
for (var i = 2; i < 15; i++) {
	fib[i] = fib[i-2] + fib[i-1];
}
console.log(fib);