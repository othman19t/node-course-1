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
const http = require("http"); //require http module
const server = http.createServer((req, res) => {
  //setup the login route and communicating with the browser
  const pathName = req.url;
  if (pathName === "/login") {
    res.end("this is the login page");
    // setup API page
  } else if (pathName === "/api") {
    // sending header and json data
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
    //setup overview route
  } else if (pathName === "/overview") {
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
  } else if (pathName === "/product") {
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
