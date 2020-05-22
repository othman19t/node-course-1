const fs = require("fs"); // require fileSystem module
const writeTxt = fs.writeFileSync("./myFile.txt", "this is my text"); // write a text in myFile.txt
const readTxt = fs.readFileSync("./myFile.txt", "utf-8"); // read the text from myFile.txt
console.log(readTxt); // log readTxt which contain the text we read from myFile.txt

// Write-Read data asynchronously
fs.writeFile("./myFile.txt", "new data", "utf-8", (err) => {
  if (err) {
    return console.log(err);
  }
  fs.readFile("./myFile.txt", "utf-8", (err, data) => {
    console.log(data);
  });
});

//setup an http server
const http = require("http"); //require http module
const server = http.createServer((req, res) => {
  //setup the login route and communicating with the browser
  const pathName = req.url;
  if (pathName == "/login") {
    return res.end("this is the login page");
  }
  //sending header and status
  res.writeHead(404, {
    "Content-type": "text/html",
    "my-own-header": "hello world",
  });
  // sending html to the browser
  res.end("<h1 >Page not found</h1>");
});

// listen to port 8000 to serve any http request on port 8000
server.listen(8000, "127.0.0.1", () => {
  console.log("server is up on port 8000");
});
