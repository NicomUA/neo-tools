import { test, beforeEach, describe } from "node:test";
import assert from 'node:assert/strict';
import { Queue } from '../queue';

describe("Queue", () => {
  let queue: Queue<number>;
  
  beforeEach(() => {
    queue = new Queue<number>();
  });

  test("should enqueue and dequeue elements", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    assert.equal(queue.size(), 3);
    assert.equal(queue.peek(), 1);

    const dequeued = queue.dequeue();
    assert.equal(dequeued, 1);
    assert.equal(queue.size(), 2);
  });

  test("should handle empty queue", () => {
    const dequeued = queue.dequeue();
    assert.equal(dequeued, null);
    assert.equal(queue.isEmpty(), true);
  });

  test("should peek at the front element without removing it", () => {
    queue.enqueue(1);
    assert.equal(queue.peek(), 1);
    assert.equal(queue.size(), 1);
  });

  test("should check if the queue is empty", () => {
    assert.equal(queue.isEmpty(), true);
    queue.enqueue(1);
    assert.equal(queue.isEmpty(), false);
  });

  test("should dequeue multiple elements", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    const dequeued = queue.dequeueCount(2);
    assert.deepEqual(dequeued, [1, 2]);
    assert.equal(queue.size(), 1);
    assert.equal(queue.peek(), 3);
  });

  test("should handle dequeueCount with more elements than available", () => {
    queue.enqueue(1);
    queue.enqueue(2);

    const dequeued = queue.dequeueCount(5);
    assert.deepEqual(dequeued, [1, 2]);
    assert.equal(queue.size(), 0);
    assert.equal(queue.isEmpty(), true);
  });

  test("should handle dequeueCount with zero count", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    
    const dequeued = queue.dequeueCount(0);
    assert.deepEqual(dequeued, []);
    assert.equal(queue.size(), 2);
  });

  test("should handle dequeueCount with empty queue", () => {
    const dequeued = queue.dequeueCount(3);
    assert.deepEqual(dequeued, []);
    assert.equal(queue.isEmpty(), true);
  });
});
