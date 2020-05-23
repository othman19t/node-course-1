const fs = require("fs"); // require fileSystem module
const http = require("http"); //require http module
const url = require("url"); //require url module
//define function to replace the placeholders
replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);
  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not_organic");
  }
  return output;
};
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
  if (pathname === "/overview") {
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
server.listen(8000, "127.0.0.1", () => {
  console.log("server is up on port 8000");
});
