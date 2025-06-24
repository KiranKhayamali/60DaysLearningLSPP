//fs module
const fs = require('node:fs');

//Synchronous Read
console.log("Synchronous Read");
const fileContents = fs.readFileSync("./test.txt", "utf-8"); //fs internally uses buffer
console.log(fileContents);

//Asynchronous Read
console.log("Asynchronous Before Read");
fs.readFile("./test.txt", "utf-8", (error, data) => {
    if (error){
        console.log(error);
    } else {
        console.log(data);
    }
});

console.log("Asynchronous After Read");

fs.writeFileSync("./greet.txt", "Hello World!!!");

fs.writeFile("./greet.txt", " Hello Kiran!", {flag: 'a'},(error) =>{ //now it will append
    if (error){
        console.log(error);
    } else {
        console.log("File written...")
    }
});
