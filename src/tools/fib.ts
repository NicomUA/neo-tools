/*
  This function calculates the nth Fibonacci number using an iterative approach.
  It uses BigInt to handle large Fibonacci numbers that exceed the range of regular numbers.
*/

export function fibonacci(n: number): BigInt {
  let a = BigInt(0);
  let b = BigInt(1);

  if (n <= 0) {
    return 0n;
  }

  if (n < 2) {
    return BigInt(n);
  }

  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }

  return b;
}
