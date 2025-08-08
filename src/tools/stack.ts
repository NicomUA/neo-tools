import { ListNode } from '../shared/list-node';

/**
 * Stack implementation using a linked list.
 * The stack follows Last In First Out (LIFO) principle.
 */
export class Stack<T = any> {
  private top: ListNode<T> | null = null;
  private length: number = 0;

  /*  * Push a new value onto the stack */
  push(value: T): void {
    const newNode = new ListNode(value);
    newNode.next = this.top;
    this.top = newNode;
    this.length++;
  }

  /*  * Remove and return the top value */
  pop(): T | null {
    if (!this.top) {
      return null; // Stack is empty
    }
    const value = this.top.value;
    this.top = this.top.next;
    this.length--;
    return value;
  }


  /*  * Peek at the top value without removing it */
  peek(): T | null {
    return this.top ? this.top.value : null; // Return the top value without removing it
  }

  /*  * Check if the stack is empty */
  isEmpty(): boolean {
    return this.length === 0; // Check if the stack is empty
  }

  /*  * Return the number of elements in the stack */
  size(): number {
    return this.length; // Return the number of elements in the stack
  }
}
