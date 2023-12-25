/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Return a promise chain which return the time in milliseconds it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function wait1(t) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, t * 1000);
  });
}

function wait2(t) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, t * 1000);
  });
}

function wait3(t) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, t * 1000);
  });
}

function calculateTime(t1, t2, t3) {
  let start = Date.now();
  return wait1(t1).then(() => {
    return wait2(t2).then(() => {
      return wait3(t3).then(() => {
        const end = Date.now();
        return end - start;
      });
    });
  });
}

module.exports = calculateTime;

// when we use promise.all it allows to execute all promises concurrently while in case of executing promises sequentialy it wait for each promise to resolve before going to resolve another one. Promise.all took 4 seconds to do the same operation for which sequential approach took 9 seconds.
