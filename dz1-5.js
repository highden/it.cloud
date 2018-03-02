var fib = [0,1]; 
for (var i = 2; i < 15; i++) {
	fib[i] = fib[i-2] + fib[i-1];
}
console.log(fib);




for (var i = 0; i < 13; i++) {
fib.push(fib[i] + fib[i+1]);
}