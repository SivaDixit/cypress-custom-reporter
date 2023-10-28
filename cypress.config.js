const { defineConfig } = require("cypress");
const { promisify } = require('cypress-promise');
//import promisify from 'cypress-promise'
const fs = require("fs");
module.exports = defineConfig({
  projectId: 'c7qk52',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
      // on('task', {
      //   log (message) {
      //     console.log(message)
      //     return null
      //   }
      // });
      
      on("task", {
        //  getFiles(folderName) {
        //   return new Promise((resolve, reject) => {
        //      fs.readdir(folderName, (err, files) => {
        //       if (err) {
        //         return reject(err);
        //       }
        //       resolve(files);
        //     });
        //   });
        // },
        async getFiles(folderName){
          let files = await fs.readdirSync(folderName);
          return files;
        }
      });

      // on("task", {
      //    deleteFile(fileName) {
      //     return new Promise((resolve, reject) => {
      //        fs.unlink(fileName, (err, files) => {
      //         if (err) {
      //           return reject(err);
      //         }

      //         resolve(files.length);
      //       });
      //     });
      //   },
      // });

      on("task", {
         async readFile(fileName) {
          // return new Promise((resolve, reject) => {
          //    fs.readFile(fileName,'utf-8',(err, data) => {
          //     if (err) {
          //       return reject(err);
          //     }

          //     resolve(data);
          //   });
          // });
          let data = await fs.readFileSync(fileName,'utf-8');
           return data;
        },
      });
    // return require('./cypress/plugins/index.js')(on,config);
    //require('cypress-terminal-report/src/installLogsPrinter')(on);
    },
    //  experimentalRunAllSpecs: true,
    specPattern: "cypress/tests/*.cy.js",
    supportFile: "cypress/support/index.js",
    baseUrl: "https://www.google.com/",
    reporter: "cypress/reports/JSONReporter.js",
    reporterOptions: {
     // mochaFile: "cypress/results/my-test-output-[hash].xml",
     
    },
  },
});
