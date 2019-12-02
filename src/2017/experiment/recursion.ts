function factorial(x: number) {
  if (x < 0) return;
  if (x === 0) return 1;
  return x * factorial(x - 1);
}

console.log(factorial(300));