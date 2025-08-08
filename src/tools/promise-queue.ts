import { Queue } from './queue';

export class PromiseQueue<T = any> {
  private queue: Queue<() => Promise<T>> = new Queue();
  private concurrentLimit: number;

  constructor(initialTasks: Array<() => Promise<T>> = [], concurrentLimit: number = 5) {
    this.queue = new Queue<() => Promise<T>>();
    initialTasks.forEach(task => this.queue.enqueue(task));
    this.concurrentLimit = concurrentLimit;
  }

  get size(): number {
    return this.queue.size();
  }

  clear(): void {
    this.queue = new Queue<() => Promise<any>>();
  }

  enqueue(task: () => Promise<any>): void {
    this.queue.enqueue(task);
  }

  async *processQueueIterator(): AsyncGenerator<T[] | void> {
    if (this.queue.isEmpty()) {
      return;
    }

    const tasks = this.queue.dequeueCount(this.concurrentLimit);
    yield await Promise.all(tasks.map(task => task()));
  }

  async processQueue(): Promise<T[] | void> {
    if (this.queue.isEmpty()) {
      return;
    }

    const tasks = this.queue.dequeueCount(this.concurrentLimit);
    return Promise.all(tasks.map(task => task()));
  }
}
