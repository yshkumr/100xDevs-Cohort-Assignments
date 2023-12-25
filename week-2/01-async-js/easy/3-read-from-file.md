## Reading the contents of a file

Write code to read contents of a file and print it to the console.
You can use the fs library to as a black box, the goal is to understand async tasks.
Try to do an expensive operation below the file read and see how it affects the output.
Make the expensive operation more and more expensive and see how it affects the output.

const fs = require("fs");

fs.readFile("test.txt", "utf-8", (err, data) => {
console.log(data);
});

let number = 0;

for (let i = 0; i < 100000; i++) {
number += i;
console.log(number);
}

as we keep making below operation take more time and time, fs even though has already read the file but it will wait for the below function to complete then it will console log data of fs.
