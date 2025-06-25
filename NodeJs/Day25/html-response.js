const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/html"});
    // const html = fs.readFileSync("./response.html", "utf-8");
    // res.end(html);
    //for large html we use stream rather than direct read
    fs.createReadStream(__dirname + "./response.html").pipe(res);
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});