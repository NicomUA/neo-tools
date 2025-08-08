import { test, beforeEach, describe } from "node:test";
import assert from 'node:assert/strict';

import { Stack } from '../stack';

describe('Stack', () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack<number>();
  });

  test('should push and pop elements', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);

    assert.equal(stack.size(), 3);
    assert.equal(stack.peek(), 3);

    const popped = stack.pop();
    assert.equal(popped, 3);
    assert.equal(stack.size(), 2);
  });

  test('should peek at the top element without removing it', () => {
    stack.push(1);
    assert.equal(stack.peek(), 1);
    assert.equal(stack.size(), 1);
  });

  test('should handle popping from an empty stack', () => {
    const popped = stack.pop();
    assert.equal(popped, null);
    assert.equal(stack.isEmpty(), true);
  });

  test('should check if the stack is empty', () => {
    assert.equal(stack.isEmpty(), true);
    stack.push(1);
    assert.equal(stack.isEmpty(), false);
  });
});

