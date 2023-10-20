const fs = require('fs');
const { JSDOM } = require('jsdom');

// Create a new JSDOM instance


// Access the document object

async function generate(){
    const { window } = new JSDOM();
    const document =  window.document;
// Create an HTML element and set its content
const div = document.createElement('div');
div.textContent = 'This is a dynamically created HTML page.';

// Append the element to the document body
document.body.appendChild(div);
//title
const title = document.createElement('title');
title.textContent = "MathWorks Emoji Report";
document.body.appendChild(title);
// Serialize the HTML content to a string
const htmlString = window.document.documentElement.outerHTML;

// Specify the file path where you want to save the HTML
const filePath = 'createdPage.html';

// Write the HTML to a file
await fs.writeFileSync(filePath, htmlString, 'utf-8'); 
}

generate();
