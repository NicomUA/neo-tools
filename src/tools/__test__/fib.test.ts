import { describe, test } from 'node:test';
import assert from 'node:assert';
import { fibonacci } from '../fib';

describe('fibonacci', () => {
  test('should return the correct Fibonacci number for n = 0', () => {
    assert.equal(fibonacci(0), 0);
  });

  test('should return the correct Fibonacci number for n = 1', () => {
    assert.equal(fibonacci(1), 1);
  });

  test('should return the correct Fibonacci number for n = 2', () => {
    assert.equal(fibonacci(2), 1);
  });

  test('should handle negative input gracefully', () => {
    assert.equal(fibonacci(-5), 0);
  });

  test('should return the correct Fibonacci number for larger n', () => {
    assert.equal(fibonacci(10), 55);
    assert.equal(fibonacci(20), 6765);
    assert.equal(fibonacci(30), 832040);
    assert.equal(fibonacci(50), 12586269025);
    assert.equal(fibonacci(100), 354224848179261915075n); // Using BigInt for large Fibonacci numbers
  });
});
