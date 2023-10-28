const parserXML = new DOMParser();
const xml2js = require("xml2js");
const parser = new xml2js.Parser();
const fs = require("fs");
const filePath =  "cypress/results";
//import 'cypress-promise/register';
const {promisify} = require('cypress-promise/register');

// after(async () => {
//     try {
//     //  const files = await cy.task("getFiles", filePath).promisify();
//     const files = await cy.task("getFiles", filePath);  
//     await cy.log('This will log to VS Code terminal: ' + files);
//       cy.log(Cypress.spec.name);
//     } catch (error) {
//       // Handle any errors that occur during the task execution
//       cy.log(`Error in after all hook: ${error.message}`);
//     }
//   });
  
