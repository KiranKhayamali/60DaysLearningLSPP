// console.log("Log 1");
// process.nextTick(() => console.log("Process next 1"));
// console.log("Log 2");

// Promise.resolve().then(() => console.log("Promise resolve 1"));
// process.nextTick(() => console.log("Process next 1"));

process.nextTick(() => console.log("This is process nextTick 1"));
process.nextTick(() =>{
    console.log("This is process nextTick 2");
    process.nextTick(() => console.log("This is the inner next tick inside the next tick block"));
});
process.nextTick(() => console.log("This is process nextTick 3"));

Promise.resolve().then(() => console.log("This is Promise resolve 1"));
Promise.resolve().then(() => {
    console.log("This is Promise resolve 2");
    process.nextTick(() => console.log("This is the inner next tick inside Promise then block"));
});
Promise.resolve().then(() => console.log("This is Promise resolve 3"));

