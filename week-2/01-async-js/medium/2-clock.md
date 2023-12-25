Using `1-counter.md` or `2-counter.md` from the easy section, can you create a
clock that shows you the current machine time?

Can you make it so that it updates every second, and shows time in the following formats -

- HH:MM::SS (Eg. 13:45:23)

- HH:MM::SS AM/PM (Eg 01:45:23 PM)

1. function nowTime() {
   console.clear();

const now = new Date();

const hours = now.getHours().toString().padStart(2, 0);
const minutes = now.getMinutes().toString().padStart(2, 0);
const seconds = now.getSeconds().toString().padStart(2, 0);

console.log(`${hours}:${minutes}:${seconds}`);
}

setInterval(() => {
nowTime();
}, 1000);

2. function nowTime() {
   console.clear();

const now = new Date();

const hours = now.getHours().toString().padStart(2, 0);
const minutes = now.getMinutes().toString().padStart(2, 0);
const seconds = now.getSeconds().toString().padStart(2, 0);

let amPm;

if (now.getHours() >= 12) {
amPm = "PM";
} else {
amPm = "AM";
}

console.log(`${hours}:${minutes}:${seconds} ${amPm}`);
}

setInterval(() => {
nowTime();
}, 1000);
