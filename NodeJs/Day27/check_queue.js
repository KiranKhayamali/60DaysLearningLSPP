// const fs = require("node:fs");

// fs.readFile(__filename, () => {
//     console.log("This is readFile 1");
//     setImmediate(() => console.log("This is inner setImmediate inside readFile"));
//     process.nextTick(() => console.log("This is inner process nextTick inside readFile "));
//     Promise.resolve().then(() => console.log("This is inner Promise resolve inside readFile"));
// });

// process.nextTick(() => console.log("This is process nextTick 1"));
// Promise.resolve().then(() => console.log("This is Promise resolve 1"));
// setTimeout(() => console.log("This is setTimeout 1"), 0);

// for(let i =0; i<2000000; i++){}
setImmediate(() => console.log("This is setImmediate 1"));
setImmediate(() => {
    console.log("This is setImmediate 2");
    process.nextTick(() => console.log("This is process nextTick 1 "));
    Promise.resolve().then(() => console.log("This is Promise resolve 1"));
});
setImmediate(() => console.log("This is setImmediate 3"));