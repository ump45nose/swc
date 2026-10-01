// Every label that prefixes the `for...of` must stay attached to the loop after
// the transform. `continue <label>` is only valid when the label names a loop,
// so a label that ends up on the generated `try` statement makes the whole
// program fail to parse.
const arr = [1, 2, 3, 4];

const seen = [];
const returned = [];

const iterable = {
  [Symbol.iterator]() {
    let i = 0;
    return {
      next() {
        return i < arr.length ? { value: arr[i++], done: false } : { value: undefined, done: true };
      },
      return() {
        returned.push(i);
        return { done: true };
      },
    };
  },
};

first: second:
for (const item of iterable) {
  seen.push(item);
  if (item === 2) {
    continue first;
  }
  if (item === 3) {
    break second;
  }
}

console.log("seen:", JSON.stringify(seen));
console.log("returned:", JSON.stringify(returned));
