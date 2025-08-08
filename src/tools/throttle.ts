/* * Throttle function to limit the execution rate of a function.
 * It ensures that the function is not called more than once in a specified delay period.
 */
export function throttle(fn: Function, delay = 300) {
  let timer: ReturnType<typeof setTimeout> | null;

  return (...args: any[]) => {
    if (!timer) {
      fn(...args)
      timer = setTimeout((() => timer = null), delay);
    }
  }
}