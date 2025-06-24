const fs = require("node:fs");
const zlib = require("node:zlib"); //helps in compressing in zip

const gzip = zlib.createGzip()

const readableStream = fs.createReadStream("./test.txt", {
    encoding: "utf-8", 
    highWaterMark: 2, //2 bytes will be the chunk size
});

readableStream.pipe(gzip).pipe(fs.WriteStream("./test2.txt.gz"))

const writeableStream = fs.createWriteStream("./test2.txt");

// readableStream.on("data", (chunk) => {
//     console.log(chunk);
//     writeableStream.write(chunk);
// });

//Pipes
readableStream.pipe(writeableStream);