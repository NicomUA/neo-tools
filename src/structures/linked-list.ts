import { ListNode } from '../shared/list-node';

/**
 * A generic doubly linked list implementation that allows efficient insertion,
 * deletion, and traversal in both directions.
 *
 * @template T - The type of elements stored in the linked list
 */
export class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private length: number = 0;

  append(value: T): void {
    const newNode = new ListNode(value);

    if (this.tail) {
      // Connect both directions between new node and existing tail
      this.tail.next = newNode;
      newNode.prev = this.tail;
    }

    this.tail = newNode;

    if (!this.head) {
      this.head = newNode;
    }

    this.length++;
  }

  prepend(value: T): void {
    const newNode = new ListNode(value);

    if (this.head) {
      // Connect both directions between new node and existing head
      newNode.next = this.head;
      this.head.prev = newNode;
    }

    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    this.length++;
  }

  find(value: T): ListNode<T> | null {
    let current: ListNode<T> | null = this.head;

    while (current) {
      if (current.value === value) {
        return current;
      }
      current = current.next;
    }

    return null; // Value not found
  }

  findLast(value: T): ListNode<T> | null {
    let current: ListNode<T> | null | undefined = this.tail;

    while (current) {
      if (current.value === value) {
        return current;
      }
      current = current.prev;
    }

    return null;
  }

  clear(): void {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  insertAfter(node: ListNode<T>, value: T): void {
    if (!node) {
      throw new Error('Node cannot be null');
    }

    const newNode = new ListNode(value);
    newNode.prev = node;
    newNode.next = node.next;

    if (node.next) {
      node.next.prev = newNode;
    } else {
      this.tail = newNode; // Update tail if inserting at the end
    }

    node.next = newNode;
    this.length++;
  }

  insertBefore(node: ListNode<T>, value: T): void {
    if (!node) {
      throw new Error('Node cannot be null');
    }

    const newNode = new ListNode(value);
    newNode.next = node;
    newNode.prev = node.prev;

    if (node.prev) {
      node.prev.next = newNode;
    } else {
      this.head = newNode; // Update head if inserting at the beginning
    }

    node.prev = newNode;
    this.length++;
  }

  indexOf(value: T): number {
    let current: ListNode<T> | null = this.head;
    let index = 0;

    while (current) {
      if (current.value === value) {
        return index; // Return the index of the first occurrence
      }
      current = current.next;
      index++;
    }

    return -1; // Value not found
  }

  lastIndexOf(value: T): number {
    let current: ListNode<T> | null | undefined = this.tail;
    let index = this.length - 1;

    while (current) {
      if (current.value === value) {
        return index; // Return the index of the last occurrence
      }
      current = current.prev;
      index--;
    }

    return -1; // Value not found
  }

  remove(value: T): boolean {
    if (!this.head) return false; // List is empty

    // Case 1: Removing the head node
    if (this.head.value === value) {
      this.head = this.head.next;

      if (this.head) {
        // New head exists, update its prev pointer
        this.head.prev = null;
      } else {
        // List is now empty
        this.tail = null;
      }

      this.length--;
      return true;
    }

    // Case 2: Removing a node that's not the head
    let current: ListNode<T> | null = this.head;

    while (current) {
      if (current.value === value) {
        // Connect the previous node to the next node
        if (current.prev) {
          current.prev.next = current.next;
        }

        // Connect the next node to the previous node
        if (current.next) {
          current.next.prev = current.prev;
        } else {
          // We're removing the tail
          this.tail = current.prev as ListNode<T> | null;
        }

        this.length--;
        return true;
      }

      current = current.next;
    }

    return false; // Value not found
  }

  size(): number {
    return this.length; // Return the number of elements in the list
  }

  isEmpty(): boolean {
    return this.length === 0; // Check if the list is empty
  }
}
