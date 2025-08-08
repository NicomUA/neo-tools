/* * Debounce function to delay the execution of a function until after a specified delay.
 * It is useful for scenarios like input validation or search suggestions where you want to wait
 * for the user to stop typing before executing the function.
 */
export function debounce(fn: Function, delay = 300) {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }
}
