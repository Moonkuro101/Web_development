/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

// First, you need to install inquirer
// npm install inquirer

// You need to install inquirer if you haven't already
// npm install inquirer

import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

// Define the questions
const questions = [
  {
    type: "input",
    name: "url",
    message: "What is your url?",
  },
];

// Use inquirer to prompt the questions
inquirer.prompt(questions).then((answers) => {
  const url = answers.url;
  console.log(`Your url is ${url}`);
  // Generate the QR code and save it as a PNG file
  const qr_svg = qr.image(url);
  qr_svg.pipe(fs.createWriteStream(`qr_img.png`));

  // Write the URL to a text file
  fs.writeFile("url.txt", url, 'utf-8', (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
});
