const fs = require("node:fs");

const readableStream = fs.createReadStream("./test.txt", {
    encoding: "utf-8", 
    highWaterMark: 2, //2 bytes will be the chunk size
});

const writeableStream = fs.createWriteStream("./test2.txt");

readableStream.on("data", (chunk) => {
    console.log(chunk);
    writeableStream.write(chunk);
});
