/**
 * Find the best element of an array, where "best" is defined by some given criteria.
 * @param array The array to traverse and find the best element of.
 * @param optimizer Either a key on the objects we're looking at that corresponds to numerical values, or a function for mapping these objects to numbers. Essentially, some way of assigning value to the elements of the array.
 * @param reverse Make this true to find the worst element of the array, and false to find the best. Defaults to false.
 */
export function maxBy<T>(
  array: T[] | readonly T[],
  optimizer: (element: T) => number,
  reverse?: boolean
): T;
export function maxBy<S extends string | number | symbol, T extends { [x in S]: number }>(
  array: T[] | readonly T[],
  key: S,
  reverse?: boolean
): T;
export function maxBy<S extends string | number | symbol, T extends { [x in S]: number }>(
  array: T[] | readonly T[],
  optimizer: ((element: T) => number) | S,
  reverse = false
): T {
  if (typeof optimizer === "function") {
    return maxBy(
      array.map((key) => ({ key, value: optimizer(key) })),
      "value",
      reverse
    ).key;
  } else {
    return array.reduce((a, b) => (a[optimizer] > b[optimizer] !== reverse ? a : b));
  }
}
