const fs = require("fs"); // require fileSystem module
const http = require("http"); //require http module
const url = require("url"); //require url module
const replaceTemplate = require("./modules/replaceTemplate");

const port = process.env.PORT || 8000;
// read data to get it ready to send it to the browser when it is requested
const tempOw = fs.readFileSync(`${__dirname}/templates/overview.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, "utf-8");
const tempPeo = fs.readFileSync(`${__dirname}/templates/product.html`, "utf-8");

const data = fs.readFileSync("./myFile.json", "utf-8");
const dataObject = JSON.parse(data);

//setup an http server
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //setup overview route
  if (pathname === "/overview" || pathname === "/") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    //looping around the object data and replace the placeholders
    const cardHtml = dataObject
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOw.replace("{%PRODUCT_CARDS%}", cardHtml);
    res.end(output);
    //setup product route
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObject[query.id];
    const output = replaceTemplate(tempPeo, product);
    res.end(output);
  } else {
    //sending header and status
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello world",
    });
    // sending html to the browser
    res.end("<h1 >Page not found</h1>");
  }
});

// listen to port 8000 to serve any http request on port 8000
server.listen(port, () => {
  console.log("server is up on port 8000");
});
