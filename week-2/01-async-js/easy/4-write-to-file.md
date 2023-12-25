## Write to a file

Using the fs library again, try to write to the contents of a file.
You can use the fs library to as a black box, the goal is to understand async tasks.

const fs = require("fs");

fs.writeFile("test.txt", "Updated file at 8:27pm", (err, data) => {
if (err) throw err;
});
