/**
 * Sorts an array in ascending order.
 * @param {Array} arr - The array to be sorted.
 * @returns {Array} - The sorted array.
 */
function sortArray(arr) {
  return arr.sort((a, b) => a - b);
}

/**
 * Sorts an array using the bubble sort algorithm.
 * @param {Array} arr - The array to be sorted.
 * @returns {Array} - The sorted array.
 */
function bubbleSort(arr) {
  let n = arr.length;
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    n--;
  } while (swapped);
  return arr;
}

export { sortArray, bubbleSort };

export { sortArray };