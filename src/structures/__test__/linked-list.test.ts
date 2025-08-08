import { beforeEach, describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { LinkedList } from '../linked-list';

describe('LinkedList', () => {
  let list: LinkedList<number>;

  beforeEach(() => {
    list = new LinkedList<number>();
  });

  describe('append', () => {
    it('should add element to empty list', () => {
      list.append(1);
      assert.equal(list.size(), 1);
      assert.equal(list.isEmpty(), false);
    });

    it('should add multiple elements', () => {
      list.append(1);
      list.append(2);
      list.append(3);
      assert.equal(list.size(), 3);
    });
  });

  describe('prepend', () => {
    it('should add element to empty list', () => {
      list.prepend(1);
      assert.equal(list.size(), 1);
      assert.equal(list.isEmpty(), false);
    });

    it('should add multiple elements to beginning', () => {
      list.prepend(1);
      list.prepend(2);
      list.prepend(3);
      assert.equal(list.size(), 3);
    });
  });

  describe('remove', () => {
    it('should return false when removing from empty list', () => {
      assert.equal(list.remove(1), false);
    });

    it('should remove head node from single element list', () => {
      list.append(1);
      assert.equal(list.remove(1), true);
      assert.equal(list.size(), 0);
      assert.equal(list.isEmpty(), true);
    });

    it('should remove head node from multi-element list', () => {
      list.append(1);
      list.append(2);
      list.append(3);
      assert.equal(list.remove(1), true);
      assert.equal(list.size(), 2);
    });

    it('should remove middle node', () => {
      list.append(1);
      list.append(2);
      list.append(3);
      assert.equal(list.remove(2), true);
      assert.equal(list.size(), 2);
    });

    it('should remove tail node', () => {
      list.append(1);
      list.append(2);
      list.append(3);
      assert.equal(list.remove(3), true);
      assert.equal(list.size(), 2);
    });

    it('should return false when value not found', () => {
      list.append(1);
      list.append(2);
      assert.equal(list.remove(5), false);
      assert.equal(list.size(), 2);
    });
  });

  describe('size', () => {
    it('should return 0 for empty list', () => {
      assert.equal(list.size(), 0);
    });

    it('should return correct size after operations', () => {
      list.append(1);
      assert.equal(list.size(), 1);
      list.append(2);
      assert.equal(list.size(), 2);
      list.remove(1);
      assert.equal(list.size(), 1);
    });
  });

  describe('isEmpty', () => {
    it('should return true for empty list', () => {
      assert.equal(list.isEmpty(), true);
    });

    it('should return false for non-empty list', () => {
      list.append(1);
      assert.equal(list.isEmpty(), false);
    });

    it('should return true after removing all elements', () => {
      list.append(1);
      list.remove(1);
      assert.equal(list.isEmpty(), true);
    });
  });

  describe('find', () => {
    it('should return null for empty list', () => {
      assert.equal(list.find(1), null);
    });

    it('should find element in single element list', () => {
      list.append(1);
      const node = list.find(1);
      assert.notEqual(node, null);
      assert.equal(node?.value, 1);
    });

    it('should find first element in multi-element list', () => {
      list.append(1);
      list.append(2);
      list.append(3);
      const node = list.find(1);
      assert.notEqual(node, null);
      assert.equal(node?.value, 1);
    });

    it('should find middle element', () => {
      list.append(1);
      list.append(2);
      list.append(3);
      const node = list.find(2);
      assert.notEqual(node, null);
      assert.equal(node?.value, 2);
    });

    it('should find last element', () => {
      list.append(1);
      list.append(2);
      list.append(3);
      const node = list.find(3);
      assert.notEqual(node, null);
      assert.equal(node?.value, 3);
    });

    it('should return null when value not found', () => {
      list.append(1);
      list.append(2);
      list.append(3);
      assert.equal(list.find(5), null);
    });

    it('should find first occurrence of duplicate values', () => {
      list.append(1);
      list.append(2);
      list.append(1);
      const node = list.find(1);
      assert.notEqual(node, null);
      assert.equal(node?.value, 1);
      // Should be the first node, not the third
      assert.equal(node?.next?.value, 2);
    });
  });

  describe('findLast', () => {
    it('should return null for empty list', () => {
      assert.equal(list.findLast(1), null);
    });

    it('should find element in single element list', () => {
      list.append(1);
      const node = list.findLast(1);
      assert.notEqual(node, null);
      assert.equal(node?.value, 1);
    });

    it('should find first element in multi-element list', () => {
      list.append(1);
      list.append(2);
      list.append(3);
      const node = list.findLast(1);
      assert.notEqual(node, null);
      assert.equal(node?.value, 1);
    });

    it('should find middle element', () => {
      list.append(1);
      list.append(2);
      list.append(3);
      const node = list.findLast(2);
      assert.notEqual(node, null);
      assert.equal(node?.value, 2);
    });

    it('should find last element', () => {
      list.append(1);
      list.append(2);
      list.append(3);
      const node = list.findLast(3);
      assert.notEqual(node, null);
      assert.equal(node?.value, 3);
    });

    it('should return null when value not found', () => {
      list.append(1);
      list.append(2);
      list.append(3);
      assert.equal(list.findLast(5), null);
    });

    it('should find last occurrence of duplicate values', () => {
      list.append(1);
      list.append(2);
      list.append(1);
      const node = list.findLast(1);
      assert.notEqual(node, null);
      assert.equal(node?.value, 1);
      // Should be the last node, not the first
      assert.equal(node?.prev?.value, 2);
    });
  });

  describe('insertAfter', () => {
    it('should throw error when node is null', () => {
      assert.throws(() => {
        list.insertAfter(null as any, 1);
      }, /Node cannot be null/);
    });

    it('should insert after node in single element list', () => {
      list.append(1);
      const node = list.find(1);
      list.insertAfter(node!, 2);
      assert.equal(list.size(), 2);
      const secondNode = list.find(2);
      assert.notEqual(secondNode, null);
      assert.equal(secondNode?.prev?.value, 1);
      assert.equal(secondNode?.next, null);
    });

    it('should insert after head node in multi-element list', () => {
      list.append(1);
      list.append(3);
      const headNode = list.find(1);
      list.insertAfter(headNode!, 2);
      assert.equal(list.size(), 3);
      const newNode = list.find(2);
      assert.equal(newNode?.prev?.value, 1);
      assert.equal(newNode?.next?.value, 3);
    });

    it('should insert after middle node', () => {
      list.append(1);
      list.append(2);
      list.append(4);
      const middleNode = list.find(2);
      list.insertAfter(middleNode!, 3);
      assert.equal(list.size(), 4);
      const newNode = list.find(3);
      assert.equal(newNode?.prev?.value, 2);
      assert.equal(newNode?.next?.value, 4);
    });

    it('should insert after tail node and update tail', () => {
      list.append(1);
      list.append(2);
      const tailNode = list.find(2);
      list.insertAfter(tailNode!, 3);
      assert.equal(list.size(), 3);
      const newNode = list.find(3);
      assert.equal(newNode?.prev?.value, 2);
      assert.equal(newNode?.next, null);
      // Verify tail was updated
      const lastNode = list.findLast(3);
      assert.notEqual(lastNode, null);
    });
  });

  describe('insertBefore', () => {
    it('should throw error when node is null', () => {
      assert.throws(() => {
        list.insertBefore(null as any, 1);
      }, /Node cannot be null/);
    });

    it('should insert before node in single element list', () => {
      list.append(2);
      const node = list.find(2);
      list.insertBefore(node!, 1);
      assert.equal(list.size(), 2);
      const firstNode = list.find(1);
      assert.notEqual(firstNode, null);
      assert.equal(firstNode?.prev, null);
      assert.equal(firstNode?.next?.value, 2);
    });

    it('should insert before head node and update head', () => {
      list.append(2);
      list.append(3);
      const headNode = list.find(2);
      list.insertBefore(headNode!, 1);
      assert.equal(list.size(), 3);
      const newNode = list.find(1);
      assert.equal(newNode?.prev, null);
      assert.equal(newNode?.next?.value, 2);
    });

    it('should insert before middle node', () => {
      list.append(1);
      list.append(3);
      list.append(4);
      const middleNode = list.find(3);
      list.insertBefore(middleNode!, 2);
      assert.equal(list.size(), 4);
      const newNode = list.find(2);
      assert.equal(newNode?.prev?.value, 1);
      assert.equal(newNode?.next?.value, 3);
    });

    it('should insert before tail node', () => {
      list.append(1);
      list.append(3);
      const tailNode = list.findLast(3);
      list.insertBefore(tailNode!, 2);
      assert.equal(list.size(), 3);
      const newNode = list.find(2);
      assert.equal(newNode?.prev?.value, 1);
      assert.equal(newNode?.next?.value, 3);
    });
  });

  describe('clear', () => {
    it('should clear empty list', () => {
      list.clear();
      assert.equal(list.size(), 0);
      assert.equal(list.isEmpty(), true);
      assert.equal(list.find(1), null);
    });

    it('should clear single element list', () => {
      list.append(1);
      assert.equal(list.size(), 1);
      list.clear();
      assert.equal(list.size(), 0);
      assert.equal(list.isEmpty(), true);
      assert.equal(list.find(1), null);
    });

    it('should clear multi-element list', () => {
      list.append(1);
      list.append(2);
      list.append(3);
      assert.equal(list.size(), 3);
      list.clear();
      assert.equal(list.size(), 0);
      assert.equal(list.isEmpty(), true);
      assert.equal(list.find(1), null);
      assert.equal(list.find(2), null);
      assert.equal(list.find(3), null);
    });

    it('should allow operations after clear', () => {
      list.append(1);
      list.append(2);
      list.clear();

      // Should be able to add elements after clear
      list.append(5);
      assert.equal(list.size(), 1);
      assert.equal(list.isEmpty(), false);
      const node = list.find(5);
      assert.notEqual(node, null);
      assert.equal(node?.value, 5);
    });
  });

  describe('indexOf', () => {
    it('should return -1 for empty list', () => {
      assert.equal(list.indexOf(1), -1);
    });

    it('should return 0 for element at beginning', () => {
      list.append(1);
      list.append(2);
      list.append(3);
      assert.equal(list.indexOf(1), 0);
    });

    it('should return correct index for middle element', () => {
      list.append(1);
      list.append(2);
      list.append(3);
      assert.equal(list.indexOf(2), 1);
    });

    it('should return correct index for last element', () => {
      list.append(1);
      list.append(2);
      list.append(3);
      assert.equal(list.indexOf(3), 2);
    });

    it('should return -1 when value not found', () => {
      list.append(1);
      list.append(2);
      list.append(3);
      assert.equal(list.indexOf(5), -1);
    });

    it('should return index of first occurrence for duplicate values', () => {
      list.append(1);
      list.append(2);
      list.append(1);
      list.append(3);
      assert.equal(list.indexOf(1), 0);
    });

    it('should return 0 for single element list', () => {
      list.append(5);
      assert.equal(list.indexOf(5), 0);
    });

    it('should return -1 for single element list when value not found', () => {
      list.append(5);
      assert.equal(list.indexOf(10), -1);
    });
  });

  describe('lastIndexOf', () => {
    it('should return -1 for empty list', () => {
      assert.equal(list.lastIndexOf(1), -1);
    });

    it('should return 0 for element at beginning in single element list', () => {
      list.append(1);
      assert.equal(list.lastIndexOf(1), 0);
    });

    it('should return correct index for last element', () => {
      list.append(1);
      list.append(2);
      list.append(3);
      assert.equal(list.lastIndexOf(3), 2);
    });

    it('should return correct index for middle element', () => {
      list.append(1);
      list.append(2);
      list.append(3);
      assert.equal(list.lastIndexOf(2), 1);
    });

    it('should return correct index for first element', () => {
      list.append(1);
      list.append(2);
      list.append(3);
      assert.equal(list.lastIndexOf(1), 0);
    });

    it('should return -1 when value not found', () => {
      list.append(1);
      list.append(2);
      list.append(3);
      assert.equal(list.lastIndexOf(5), -1);
    });

    it('should return index of last occurrence for duplicate values', () => {
      list.append(1);
      list.append(2);
      list.append(1);
      list.append(3);
      assert.equal(list.lastIndexOf(1), 2);
    });

    it('should return correct index for multiple duplicates', () => {
      list.append(2);
      list.append(2);
      list.append(1);
      list.append(2);
      list.append(3);
      assert.equal(list.lastIndexOf(2), 3);
    });

    it('should return 0 for single element list', () => {
      list.append(5);
      assert.equal(list.lastIndexOf(5), 0);
    });

    it('should return -1 for single element list when value not found', () => {
      list.append(5);
      assert.equal(list.lastIndexOf(10), -1);
    });
  });
});
