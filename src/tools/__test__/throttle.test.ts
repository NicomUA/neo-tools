import { test, beforeEach, describe } from "node:test";
import assert from 'node:assert/strict';
import { throttle } from '../throttle';

describe('Throttle', () => {
  let calls: number;
  let throttledFn: Function;

  beforeEach(() => {
    calls = 0;
    throttledFn = throttle(() => {
      calls++;
    }, 100);
  });

  test('should call the function immediately and then throttle subsequent calls', () => {
    throttledFn();
    assert.equal(calls, 1);

    // Call again within the throttle period
    throttledFn();
    assert.equal(calls, 1);

    // Wait for the throttle period to pass
    setTimeout(() => {
      throttledFn();
      assert.equal(calls, 2);
    }, 150);
  });

  test('should not call the function if called multiple times within the delay', () => {
    for (let i = 0; i < 5; i++) {
      throttledFn();
    }
    assert.equal(calls, 1);
  });

  test('should allow calls after the delay has passed', () => {
    throttledFn();
    assert.equal(calls, 1);

    // Wait for the throttle period to pass
    setTimeout(() => {
      throttledFn();
      assert.equal(calls, 2);
    }, 150);
  });

  
});
