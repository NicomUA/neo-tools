import { ListNode } from '../shared/list-node';

/**
 * Queue implementation using a linked list.
 * The queue follows First In First Out (FIFO) principle.
 */
export class Queue<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private length: number = 0;

  enqueue(value: T): void {
    const newNode = new ListNode(value);
    if (this.tail) {
      this.tail.next = newNode;
    }
    this.tail = newNode;
    if (!this.head) {
      this.head = newNode;
    }
    this.length++;
  }

  dequeue(): T | null {
    if (!this.head) {
      return null; // Queue is empty
    }
    const value = this.head.value;
    this.head = this.head.next;
    if (!this.head) {
      this.tail = null; // Queue is now empty
    }
    this.length--;
    return value;
  }

  dequeueCount(count: number = 1): T[] {
    const values: T[] = [];
    for (let i = 0; i < count && !this.isEmpty(); i++) {
      const value = this.dequeue();
      if (value !== null) {
        values.push(value);
      }
    }
    return values;
  }

  peek(): T | null {
    return this.head ? this.head.value : null; // Return the front value without removing it
  }

  isEmpty(): boolean {
    return this.length === 0; // Check if the queue is empty
  }

  size(): number {
    return this.length; // Return the number of elements in the queue
  }
}


