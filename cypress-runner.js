//Cypress-runner

const cypress = require('cypress');
const FileUtils = require('./cypress/reports/FileUtils');
const HtmlBuilder = require('./cypress/reports/HtmlBuilder');
const fileutils = new FileUtils();
const htmlBuilder = new HtmlBuilder();
const jsonDirPath = "cypress/reports/jsons";
let results = [];

async function runTests(){
 
    const runResults = await cypress.run();
    await console.log("----------------------------------------------cypress run completed--------------------------------");
    await console.log("-------------------------------------custom report builder starts --------------------------------");
   // await console.log(JSON.stringify(results));
    await console.log(runResults.browserName);
    await console.log(runResults.totalSuites);
    await console.log(runResults.config.baseUrl);
    await console.log(runResults.totalTests);
    await console.log(runResults.totalPassed);
    await console.log(runResults.totalPending);
    await console.log(runResults.totalSkipped);
    await console.log(runResults.endedTestsAt);

    const files = await fileutils.getFilesFromJsonFolder(jsonDirPath);
    console.log(files);
    for(let i=0;i<files.length;i++){
      let resultData =await fileutils.readJsonFileFromFolder(jsonDirPath+'/'+files[i]);
      await results.push(resultData);

    }
    await htmlBuilder.buildHtml(results,runResults);
    await console.log(JSON.stringify(results));
    await fileutils.deleteFilesFromFolder(jsonDirPath,files);
    

}

runTests();