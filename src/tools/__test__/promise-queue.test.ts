import { describe, test, beforeEach } from 'node:test'
import assert from 'node:assert/strict';


import { PromiseQueue } from '../promise-queue';


describe('PromiseQueue', () => {
  let queue: PromiseQueue;

  beforeEach(() => {
    queue = new PromiseQueue();
  });

  test('should initialize with empty queue', () => {
    assert.equal(queue.size, 0);
  });

  test('should enqueue and process tasks sequentially', async () => {
    let results: number[] = [];
    
    queue.enqueue(() => Promise.resolve(1).then(result => results.push(result)));
    queue.enqueue(() => Promise.resolve(2).then(result => results.push(result)));
    queue.enqueue(() => Promise.resolve(3).then(result => results.push(result)));

    for await (const _ of queue.processQueueIterator()) {}

    assert.deepEqual(results, [1, 2, 3]);
  });

  test('process queue throw generator by concurrency limit', async () => {
    const limitedQueue = new PromiseQueue([], 2); // Set concurrency limit to 2

    limitedQueue.enqueue(() => new Promise(resolve => setTimeout(() => resolve(1), 100)));
    limitedQueue.enqueue(() => new Promise(resolve => setTimeout(() => resolve(2), 50)));
    limitedQueue.enqueue(() => new Promise(resolve => setTimeout(() => resolve(3), 150)));
    limitedQueue.enqueue(() => new Promise(resolve => setTimeout(() => resolve(4), 200)));

    const results = await limitedQueue.processQueueIterator().next();
    assert.equal(limitedQueue.size, 2);

    await limitedQueue.processQueueIterator().next();
    assert.equal(limitedQueue.size, 0);
  });

  test('process queue by concurrency limit', async () => {
    const limitedQueue = new PromiseQueue([], 2); // Set concurrency limit to 2

    limitedQueue.enqueue(() => new Promise(resolve => setTimeout(() => resolve(1), 100)));
    limitedQueue.enqueue(() => new Promise(resolve => setTimeout(() => resolve(2), 50)));
    limitedQueue.enqueue(() => new Promise(resolve => setTimeout(() => resolve(3), 150)));
    limitedQueue.enqueue(() => new Promise(resolve => setTimeout(() => resolve(4), 200)));

    const results = await limitedQueue.processQueue();
    assert.equal(limitedQueue.size, 2);

    await limitedQueue.processQueue();
    assert.equal(limitedQueue.size, 0);
  });

  test('should clear the queue', () => {
    queue.enqueue(() => Promise.resolve(1));
    queue.enqueue(() => Promise.resolve(2));

    assert.equal(queue.size, 2);
    queue.clear();
    assert.equal(queue.size, 0);
  });

});