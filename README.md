# neo-tools

A collection of useful and efficient JavaScript/TypeScript utility tools for modern development.

## 📦 Installation

```bash
npm install neo-tools
# or
yarn add neo-tools
# or
pnpm add neo-tools
```

## 🚀 Features

- **TypeScript Support**: Full TypeScript definitions included
- **Zero Dependencies**: Lightweight and efficient
- **Tree Shakeable**: Import only what you need
- **Well Tested**: Comprehensive test suite
- **Modern ES Modules**: Built for modern JavaScript environments

## 📚 API Reference

### Function Utilities

#### `debounce(fn, delay)`

Delays the execution of a function until after a specified delay. Useful for scenarios like input validation or search suggestions.

```typescript
import { debounce } from 'neo-tools';

const debouncedSearch = debounce((query: string) => {
  console.log('Searching for:', query);
}, 300);

// Will only execute after user stops typing for 300ms
debouncedSearch('hello');
debouncedSearch('hello world'); // Previous call is cancelled
```

**Parameters:**
- `fn` (Function): The function to debounce
- `delay` (number): The delay in milliseconds (default: 300)

#### `throttle(fn, delay)`

Limits the execution rate of a function, ensuring it's not called more than once in a specified delay period.

```typescript
import { throttle } from 'neo-tools';

const throttledScroll = throttle(() => {
  console.log('Scroll event fired');
}, 100);

window.addEventListener('scroll', throttledScroll);
```

**Parameters:**
- `fn` (Function): The function to throttle
- `delay` (number): The delay in milliseconds (default: 300)

### Data Structures

#### `Stack<T>`

A Last In First Out (LIFO) stack implementation using linked lists.

```typescript
import { Stack } from 'neo-tools';

const stack = new Stack<number>();

stack.push(1);
stack.push(2);
stack.push(3);

console.log(stack.pop()); // 3
console.log(stack.peek()); // 2
console.log(stack.size()); // 2
console.log(stack.isEmpty()); // false
```

**Methods:**
- `push(value: T): void` - Add an element to the top
- `pop(): T | null` - Remove and return the top element
- `peek(): T | null` - View the top element without removing
- `isEmpty(): boolean` - Check if stack is empty
- `size(): number` - Get the number of elements

#### `Queue<T>`

A First In First Out (FIFO) queue implementation using linked lists.

```typescript
import { Queue } from 'neo-tools';

const queue = new Queue<string>();

queue.enqueue('first');
queue.enqueue('second');
queue.enqueue('third');

console.log(queue.dequeue()); // 'first'
console.log(queue.peek()); // 'second'
console.log(queue.size()); // 2

// Dequeue multiple items at once
const items = queue.dequeueCount(2); // ['second', 'third']
```

**Methods:**
- `enqueue(value: T): void` - Add an element to the rear
- `dequeue(): T | null` - Remove and return the front element
- `dequeueCount(count: number): T[]` - Remove and return multiple elements
- `peek(): T | null` - View the front element without removing
- `isEmpty(): boolean` - Check if queue is empty
- `size(): number` - Get the number of elements

#### `LinkedList<T>`

A doubly linked list implementation supporting efficient insertions, removals, and traversal.

```typescript
import { LinkedList } from 'neo-tools';

const list = new LinkedList<number>();

list.append(1);
list.append(2);
list.append(3);

console.log(list.size()); // 3
console.log(list.find(2)?.value); // 2
list.remove(2);
console.log(list.size()); // 2
list.prepend(0);
console.log(list.find(0)?.next?.value); // 1

// Insert after a node
const node = list.find(1);
list.insertAfter(node!, 1.5);
console.log(list.find(1.5)?.prev?.value); // 1

// Iterate through the list
for (const value of list) {
  console.log(value);
}
```

**Methods:**
- `append(value: T): void` - Add an element to the end
- `prepend(value: T): void` - Add an element to the beginning
- `remove(value: T): boolean` - Remove the first occurrence of a value
- `find(value: T): ListNode<T> | null` - Find the first node with the given value
- `findLast(value: T): ListNode<T> | null` - Find the last node with the given value
- `insertAfter(node: ListNode<T>, value: T): void` - Insert a value after the given node
- `insertBefore(node: ListNode<T>, value: T): void` - Insert a value before the given node
- `clear(): void` - Remove all elements
- `size(): number` - Get the number of elements
- `isEmpty(): boolean` - Check if the list is empty
- `indexOf(value: T): number` - Get the index of the first occurrence
- `lastIndexOf(value: T): number` - Get the index of the last occurrence

#### `PromiseQueue<T>`

A queue for managing concurrent promise execution with configurable concurrency limits.

```typescript
import { PromiseQueue } from 'neo-tools';

// Create a queue with concurrency limit of 3
const promiseQueue = new PromiseQueue<string>([], 3);

// Add tasks to the queue
promiseQueue.enqueue(() => fetch('/api/data1').then(r => r.text()));
promiseQueue.enqueue(() => fetch('/api/data2').then(r => r.text()));
promiseQueue.enqueue(() => fetch('/api/data3').then(r => r.text()));

// Process all tasks (returns Promise)
const results = await promiseQueue.processQueue();
console.log(results); // ['data1', 'data2', 'data3']

// Or process with iterator for streaming results
for await (const batch of promiseQueue.processQueueIterator()) {
  console.log('Batch completed:', batch);
}
```

**Constructor:**
- `constructor(initialTasks?, concurrentLimit?)` - Create a new promise queue
  - `initialTasks` (Array): Initial array of promise-returning functions
  - `concurrentLimit` (number): Maximum concurrent promises (default: 5)

**Methods:**
- `enqueue(task: () => Promise<T>): void` - Add a promise-returning function
- `processQueue(): Promise<T[] | void>` - Execute all tasks and return results
- `processQueueIterator(): AsyncGenerator<T[] | void>` - Execute tasks with streaming results
- `clear(): void` - Clear all pending tasks
- `size: number` - Get the number of pending tasks

## 🛠️ Development

### Building

```bash
npm run build
```

### Testing

```bash
npm test
```

## 📝 License

MIT © [Mykyta Matsapura](https://github.com/nicomua)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Roadmap

- [x] Additional data structures (LinkedList, DoubleLinkedList)
- [ ] More utility functions (memoization, curry, compose)
- [ ] Performance benchmarks
- [ ] Browser compatibility testing
- [ ] Additional async utilities

---

**Made with ❤️ for the JavaScript/TypeScript community**
