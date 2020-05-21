const fs = require("fs"); // require fileSystem module
const writeTxt = fs.writeFileSync("./myFile.txt", "this is my text"); // write a text in myFile.txt
const readTxt = fs.readFileSync("./myFile.txt", "utf-8"); // read the text from myFile.txt
console.log(readTxt); // log readTxt which contain the text we read from myFile.txt
