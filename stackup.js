const http = require("http");
const fs = require("fs");

module.exports.fileSystem = fs.readFile("./file.txt", "utf-8", (err, file) => {
  const sample = "added from writeFile";
  fs.writeFile("./file.txt", `${file}\n${sample}`, "utf-8", (err) => {
    console.log("File has been written");
    console.log(file, "currFile");
  });
});

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName == "/overview") {
    res.end("This is overview");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>page not found</h1>");
  }
});
server.listen(8000, () => {
  console.log("server is running");
});
