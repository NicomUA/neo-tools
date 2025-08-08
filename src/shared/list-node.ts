export class ListNode<T = any> {
  value: T;
  next: ListNode<T> | null;
  prev?: ListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}