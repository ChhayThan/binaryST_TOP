export default function mergeSort(array) {
  if (array.length === 1) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  const leftArray = array.slice(0, middle);
  const rightArray = array.slice(middle, array.length);

  return merge(mergeSort(leftArray), mergeSort(rightArray));
}

function merge(arrayLeft, arrayRight) {
  const result = [];

  let indexLeft = 0;
  let indexRight = 0;

  while (indexLeft < arrayLeft.length && indexRight < arrayRight.length) {
    if (arrayLeft[indexLeft] > arrayRight[indexRight]) {
      result.push(arrayRight[indexRight]);
      indexRight++;
    } else {
      result.push(arrayLeft[indexLeft]);
      indexLeft++;
    }
  }
  while (indexLeft < arrayLeft.length) {
    result.push(arrayLeft[indexLeft]);
    indexLeft++;
  }

  while (indexRight < arrayRight.length) {
    result.push(arrayRight[indexRight]);
    indexRight++;
  }

  return result;
}
