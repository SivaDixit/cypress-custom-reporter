const fs = require('fs');
const { JSDOM } = require('jsdom');
const  FileUtils = require('./FileUtils');
const fileUtils = new FileUtils(); 

const emojiJson = {

    "suiteEmoji":{
   
       "0": "&#128514",
       "1": "&#128512",
       "2": "&#128517",
       "3": "&#128527",
       "4": "&#128528",
       "5": "&#128529",
       "6": "&#128530",
       "7": "&#128531",
       "8": "&#128542",
       "9": "&#128543",
       "10": "&#128544",
       "11": "&#128557"
    }
   
   
   
   }

class HtmlBuilder{


  async buildHtml(jsonObj,resultsObj){

    try{
        const scriptCode = `
    let accordionBtn = document.getElementsByClassName('accordion-button');
    let accordionHeader = document.getElementsByClassName('accordion-header');
    let accordionContent = document.getElementsByClassName('accordion-collapse collapse');
    let testCaseList = document.getElementsByClassName("test-case-list");
    for(let i=0;i<accordionBtn.length;i++){
    accordionBtn[i].addEventListener('click',function(){
      
       if(accordionBtn[i].getAttribute('aria-expanded') === "true"){
             
             accordionContent[i].classList.remove('show');
             accordionBtn[i].setAttribute('aria-expanded','false');
             accordionBtn[i].classList.add('collapsed');
             
             
       }
       else{
           accordionContent[i].classList.add('show');
           accordionBtn[i].setAttribute('aria-expanded','true');
           accordionBtn[i].classList.remove('collapsed');
          
       }
    
       
    });
    
    }
    function toggleErrorDetails(button) {
       const errorDetails = button.parentNode.querySelector('.errorDetails');
       const isHidden = errorDetails.style.display === 'none';
       if (isHidden) {
         errorDetails.style.display = 'block';
         
       } else {
         errorDetails.style.display = 'none';
         
       }
       
     }
    
    `
        const dom = new JSDOM();
        const document =  dom.window.document;
        let suiteEmoji = emojiJson.suiteEmoji;
        const doctype = document.implementation.createDocumentType("html", "", "");
    
    // Add the DOCTYPE to the document
    document.insertBefore(doctype, document.firstChild);
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
    // Create an HTML element and set its content
    
    //title
    const title = document.createElement('title');
    title.textContent = "MathWorks Emoji Report";
    document.head.appendChild(title);
    document.head.appendChild(link);
    
    // Create h1 element
    const h1 = document.createElement('h1');
    h1.textContent = 'QE Automation Report';
    document.body.appendChild(h1);
    
    // Create div.reports-metadata
    const reportsMetadataDiv = document.createElement('div');
    reportsMetadataDiv.classList.add('reports-metadata');
    
    // Create span.float-start
    const span = document.createElement('span');
    span.classList.add('float-start');
    span.style.fontSize = '120px';
    span.innerHTML = '&#x2699';
    reportsMetadataDiv.appendChild(span);
    
    // Create h5 elements
    const h5Department = document.createElement('h5');
    h5Department.textContent = 'Department: QE Department';
    reportsMetadataDiv.appendChild(h5Department);
    
    const h5Team = document.createElement('h5');
    h5Team.textContent = 'Team: QE Team';
    reportsMetadataDiv.appendChild(h5Team);
    
    const h5AutomationTool = document.createElement('h5');
    h5AutomationTool.textContent = 'Automation Tool: Cypress';
    reportsMetadataDiv.appendChild(h5AutomationTool);
    
    const h5Browser = document.createElement('h5');
    h5Browser.textContent = `browser: ${resultsObj.browserName}`;
    reportsMetadataDiv.appendChild(h5Browser);
    
    const h5Date = document.createElement('h5');
    h5Date.textContent = `Date: ${await fileUtils.changeDateFormat(resultsObj.endedTestsAt)}`;
    reportsMetadataDiv.appendChild(h5Date);
    const currentTime = new Date().toLocaleTimeString();
    const h5Time = document.createElement('h5');
    h5Time.textContent = `Time: ${currentTime}`;
    reportsMetadataDiv.appendChild(h5Time);
    
    document.body.appendChild(reportsMetadataDiv);
    
    // Create div.resultsSummary-container-fluid
    const resultsSummaryDiv = document.createElement('div');
    resultsSummaryDiv.classList.add('resultsSummary-container-fluid');
    
    // Create h3 element
    const h3 = document.createElement('h3');
    h3.textContent = 'Execution Summary';
    h3.style.marginLeft = '20px';
    resultsSummaryDiv.appendChild(h3);
    
    // Create table.summary-table
    const table = document.createElement('table');
    table.classList.add('summary-table');
    
    // Create thead element
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    
    // Create th elements
    const thBaseUrl = document.createElement('th');
    thBaseUrl.textContent = 'Base Url';
    tr.appendChild(thBaseUrl);
    
    const thTotalSuites = document.createElement('th');
    thTotalSuites.textContent = 'Total Suites';
    tr.appendChild(thTotalSuites);
    
    const thTotalTests = document.createElement('th');
    thTotalTests.textContent = 'Total Tests';
    tr.appendChild(thTotalTests);
    
    const thTotalPassed = document.createElement('th');
    thTotalPassed.textContent = 'Total Passed';
    tr.appendChild(thTotalPassed);
    
    const thTotalFailed = document.createElement('th');
    thTotalFailed.textContent = 'Total Failed';
    tr.appendChild(thTotalFailed);
    
    const thTotalSkipped = document.createElement('th');
    thTotalSkipped.textContent = 'Total Skipped';
    tr.appendChild(thTotalSkipped);
    
    const thTotalPending = document.createElement('th');
    thTotalPending.textContent = 'Total Pending';
    tr.appendChild(thTotalPending);
    
    const thCypressFeeling = document.createElement('th');
    thCypressFeeling.textContent = 'Emoji Reaction';
    tr.appendChild(thCypressFeeling);
    
    thead.appendChild(tr);
    table.appendChild(thead);
    
    // Create tbody element
    const tbody = document.createElement('tbody');
    const trData = document.createElement('tr');
    
    // Create td elements
    const tdBaseUrl = document.createElement('td');
    tdBaseUrl.textContent = resultsObj.config.baseUrl;
    trData.appendChild(tdBaseUrl);
    
    const tdTotalSuites = document.createElement('td');
    tdTotalSuites.textContent = resultsObj.totalSuites;
    trData.appendChild(tdTotalSuites);
    
    const tdTotalTests = document.createElement('td');
    tdTotalTests.textContent = resultsObj.totalTests;
    trData.appendChild(tdTotalTests);
    
    const tdTotalPassed = document.createElement('td');
    tdTotalPassed.textContent = resultsObj.totalPassed;
    trData.appendChild(tdTotalPassed);
    
    const tdTotalFailed = document.createElement('td');
    tdTotalFailed.textContent = resultsObj.totalFailed;
    trData.appendChild(tdTotalFailed);
    
    const tdTotalSkipped = document.createElement('td');
    tdTotalSkipped.textContent = resultsObj.totalSkipped;
    trData.appendChild(tdTotalSkipped);
    
    const tdTotalPending = document.createElement('td');
    tdTotalPending.textContent = resultsObj.totalPending;
    trData.appendChild(tdTotalPending);
    
    const tdCypressFeeling = document.createElement('td');
    tdCypressFeeling.style.fontSize = '24px';
    let totalSummaryEmoji = await this.calcPassPercentage(resultsObj.totalTests,resultsObj.totalPassed);
    tdCypressFeeling.innerHTML = emojiJson.suiteEmoji[totalSummaryEmoji];
    trData.appendChild(tdCypressFeeling);
    
    tbody.appendChild(trData);
    table.appendChild(tbody);
    
    resultsSummaryDiv.appendChild(table);
    document.body.appendChild(resultsSummaryDiv);
    
    //adding styles to the html page 
    const style = document.createElement('style');
    style.textContent = `
    .collapsible {
        background-color: #f1f1f1;
        cursor: pointer;
        padding: 18px;
        width: 100%;
        border: none;
        text-align: left;
        outline: none;
        font-size: 15px;
        transition: 0.4s;
        position: relative;
      }
    
      .active, .collapsible:hover {
        background-color: #f1f1f1;
      }
    
      .content {
        padding: 0 18px;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.2s ease-out;
        background-color: white;
      }
    
          .badge.bg-success{
              padding: 5px;
              margin-right: 5px;
            margin-left: 5px;
            margin-top: 5px;
           margin-bottom: 5px;
    
          }
          .badge.bg-danger{
              padding: 5px;
              margin-right: 5px;
            margin-left: 5px;
            margin-top: 5px;
           margin-bottom: 5px;
          }
          .badge.bg-primary{
            padding: 5px;
            margin-right: 5px;
            margin-left: 5px;
            margin-top: 5px;
            margin-bottom: 5px;
          }
          .test-case-list li .emoji {
           margin-right: 10px;
           font-size: 24px;
          }
          .test-case-list .passed{
              background-color:rgb(86, 200, 86);
        padding: 10px;
        border-radius: 5px;
          }
          .test-case-list .failed{
              background-color: #d74444;
        padding: 10px;
        border-radius: 5px;
        
          }
          table {
        border-collapse: collapse;
        width: 100%;
        background-color: #f2f2f2;
        border: 2px solid black; 
        padding: 10px;
        
      }
    
      th, td {
        padding: 8px;
        text-align: left;
        border: 2px solid black; 
        padding: 10px;
      }
    
      th {
        background-color: #333;
        color: #fff;
        border: 2px solid black; 
        padding: 10px;
      }
    
         
      
      .emoji {
        float: right;
        margin-top: -10px;
        /* top: 50%;
        right: 10px;
        font-size: 24px; */
      }
    
      .suite-emoji{
        float: right;
        margin-top: -10px;
        
      }
    
    
      .test-case-list {
        list-style-type: none;
        padding: 0;
      }
    
      .test-case-list li {
        margin-bottom: 10px;
      }
      .errorDetails{
          background-color:white;
          padding: 10px;
          margin-top: 10px;
          margin-left: 10px;
          margin-right: 10px;
          margin-bottom: 10px;
      }
    
      .hidden{
          display: none;
      }
      h1{
        text-align: center;
      }
      h2{
        text-align: left;
      }
      h3{
        text-align: left;
        width: auto;
      }
      .reports-metadata{
        border: 2px solid #ff0000; /* Replace #ff0000 with your desired color */
        padding: 10px;
        margin-top: 20px;
          margin-left: 200px;
          margin-right: 200px;
          margin-bottom: 20px;
        width:auto;
        text-align:justify;
      }
      .summary-table{
        margin-top: 20px;
        margin-left: 20px;
        margin-right: 20px;
        margin-bottom: 30px;
        width: auto;
    
      }
      .accordion.accordion-flush{
        padding: 10px;
        margin-top: 10px;
        margin-left: 20px;
        margin-right: 20px;
        margin-bottom: 30px;
      }
      .errorDetails{
        display: none;
       
      }
      .accordion-header {
        display: flex;
        align-items: center;
      }
      
      .accordion-header-content {
        display: flex;
        flex-grow: 1;
        align-items: center;
      }
      
      .accordion-header-text {
        flex-grow: 1;
      }
      
      .accordion-header-details {
        margin-left: auto;
      }
    `
    
    document.head.appendChild(style);
    
    //adding the accordion section 
    let suiteSummaryContainer = document.createElement('div');
    suiteSummaryContainer.classList.add('testSuite-container-fluid');
    
    let suiteSummaryHeading = document.createElement('h3');
    suiteSummaryHeading.setAttribute('style','margin-left: 20px;');
    suiteSummaryHeading.textContent = 'Suite Summary';
    suiteSummaryContainer.appendChild(suiteSummaryHeading);
    
    let suiteSummaryAccordion = document.createElement('div');
    suiteSummaryAccordion.classList.add('accordion' ,'accordion-flush');
    suiteSummaryAccordion.setAttribute('id','suiteAccordion');
    
    let suiteSummaryAccordionCard = document.createElement('div');
    suiteSummaryAccordionCard.classList.add('card');
    
    
        const suitesData = jsonObj;
        
      
    for(let i=0;i<suitesData.length;i++){
    let suiteAccord = document.createElement('div');
    suiteAccord.classList.add('accordion-item');
    let suiteAccordionHeader = document.createElement('h3');
    suiteAccordionHeader.classList.add('accordion-header');
    let suiteId = `Suite${i.toString()}`
    suiteAccordionHeader.setAttribute('id',suiteId);
    let suiteButton = await this.createSuiteHeader(document,suitesData[i],i,suiteEmoji);
    suiteAccordionHeader.appendChild(suiteButton);
    let suiteBody = await this.suiteCollapse(document,suitesData[i],suiteId);
    suiteAccord.appendChild(suiteAccordionHeader);
    suiteAccord.appendChild(suiteBody);
    suiteSummaryAccordionCard.appendChild(suiteAccord);
    }
    suiteSummaryAccordion.appendChild(suiteSummaryAccordionCard);
    suiteSummaryContainer.appendChild(suiteSummaryAccordion);
    
    document.body.appendChild(suiteSummaryContainer);
    
    const script = document.createElement('script');
    script.textContent = scriptCode;
    document.body.appendChild(script);

    //popper
   const popper = document.createElement('script');
   popper.setAttribute('src','https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js');
   document.body.appendChild(popper);
    //bootstrap 5 js
    const bs5script = document.createElement('script');
    bs5script.setAttribute('src','https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js');
    document.body.appendChild(bs5script);
    //jquery
    const jquery = document.createElement('script');
    jquery.setAttribute('src','https://code.jquery.com/jquery-3.5.1.slim.min.js');
    // Serialize the HTML content to a string
    const htmlString = dom.serialize(); 
    
    // Specify the file path where you want to save the HTML
    const filePath = `${await fileUtils.changeDateFormat(resultsObj.endedTestsAt)} ${await fileUtils.changeTimeFormat()}.html`;
    
    // Write the HTML to a file
    await fs.writeFileSync(filePath, htmlString, 'utf-8'); 
    }
    catch(error){
     throw error
    }
    }

    
    async createSuiteHeader(document,jsonObj,i,suiteEmoji){
      try{
        let suiteAccordionButton = document.createElement('button');
    suiteAccordionButton.classList.add('accordion-button' ,'collapsed');
    suiteAccordionButton.setAttribute('type','button');
    suiteAccordionButton.setAttribute('data-bs-toggle','collapse');
    suiteAccordionButton.setAttribute('data-bs-target',`#collapse${i.toString()}`);
    suiteAccordionButton.setAttribute('aria-expanded','false');
    suiteAccordionButton.setAttribute('aria-controls',`collapse${i.toString()}`);
    
    const suiteIcons = await this.createSuiteBadge(document,jsonObj,suiteEmoji);
    let buttonTitle = document.createElement('span');
    buttonTitle.classList.add('accordion-header-text');
    buttonTitle.innerHTML = jsonObj[1].filename;
    let buttonContent = document.createElement('div');
    buttonContent.classList.add('accordion-header-content');
    buttonContent.appendChild(buttonTitle);
    buttonContent.appendChild(suiteIcons);
    suiteAccordionButton.appendChild(buttonContent);
    return await suiteAccordionButton;
      }
      catch(error){
       throw error
      }
    }
    
    async  createSuiteBadge(document,jsonObj,suiteEmoji){
        try{
        let suiteSummaryIcons = document.createElement('div');
        suiteSummaryIcons.classList.add('accordion-header-details');
        let suiteSummaryTotal = document.createElement('span');
        suiteSummaryTotal.classList.add('badge', 'bg-primary');
        suiteSummaryTotal.textContent = `Total: ${jsonObj[0].total}`
        let suiteSummaryPassed = document.createElement('span');
        suiteSummaryPassed.classList.add('badge', 'bg-success');
        suiteSummaryPassed.textContent = `Passed: ${jsonObj[0].passed}`
        let suiteSummaryFailed = document.createElement('span');
        suiteSummaryFailed.classList.add('badge', 'bg-danger');
        suiteSummaryFailed.textContent = `Failed: ${jsonObj[0].failed}`
        let suiteSummaryEmoji = document.createElement('span');
        suiteSummaryEmoji.setAttribute('style','margin-left: 700px; font-size: 30px');
        let passPercentage = await this.calcPassPercentage(jsonObj[0].total,jsonObj[0].passed);
        suiteSummaryEmoji.innerHTML = emojiJson.suiteEmoji[passPercentage];
        suiteSummaryIcons.appendChild(suiteSummaryTotal);
        suiteSummaryIcons.appendChild(suiteSummaryPassed);
        suiteSummaryIcons.appendChild(suiteSummaryFailed);
        suiteSummaryIcons.appendChild(suiteSummaryEmoji);
        return await suiteSummaryIcons;    
    }
    catch(error){
     throw error
    }
    }
    
    async  suiteCollapse(document,jsonObj,suiteId){
    let suiteCollapse = document.createElement('div');
    suiteCollapse.classList.add('accordion-collapse','collapse');
    suiteCollapse.setAttribute('id',`${suiteId}collapse`);
    suiteCollapse.setAttribute("aria-labelledby",`heading${suiteId}`);
    suiteCollapse.setAttribute("data-bs-parent","#suiteAccordion");
    let testCasesCard = document.createElement('div');
    testCasesCard.classList.add('card-body');
    let testcases = jsonObj[0].testcases;
    
    if(Array.isArray(testcases)){
    
       let testCaseList = document.createElement('ul'); 
       testCaseList.classList.add('test-case-list');
        for(let i=0;i<testcases.length;i++){
        
            let testcase = await this.getTestCaseStatus(document,testcases[i],jsonObj[0].suiteName);
              testCaseList.appendChild(testcase);
          } 
          testCasesCard.appendChild(testCaseList);  
    }
    suiteCollapse.appendChild(testCasesCard);
    return await suiteCollapse;
    }
    
    async  getTestCaseStatus(document,testcaseObj,suiteName){
    try{
     let testcase = document.createElement('li');
     let testcaseEmoji;
     if(typeof testcaseObj === 'object'){
       
        let objKeys = Object.keys(testcaseObj);
        
        if(objKeys.includes('error')){
           testcase.classList.add("failed");
            testcaseEmoji = document.createElement("span");
           testcaseEmoji.classList.add('emoji');
           let testcaseName;
           if(objKeys[0].includes(suiteName)){
            testcaseName = objKeys[0].replace(suiteName,'');
           }
           testcaseEmoji.innerHTML = `&#x1F44E`
           
           testcase.innerHTML = `${testcaseName} : failed`;   
           testcase.appendChild(testcaseEmoji);
         let errorMessage = await this.getErrorMessageNode(document,testcaseObj[objKeys[1]]);
         let showError = await this.showBugButtonNode(document);
         testcase.appendChild(showError);
         testcase.appendChild(errorMessage);
        }
        else{
            testcase.classList.add("passed");
            testcaseEmoji = document.createElement("span");
            testcaseEmoji.classList.add('emoji');
            let testcaseName;
            if(objKeys[0].includes(suiteName)){
             testcaseName = objKeys[0].replace(suiteName,'');
            }
            testcaseEmoji.innerHTML = `&#x1F44D`
            
            testcase.innerHTML = `${testcaseName} : passed`;   
            testcase.appendChild(testcaseEmoji);
        }
      return await testcase;
     }
    }
    catch(error){
     throw error
    }
    
    }
    
    async  getErrorMessageNode(document,errorObj){
    try{
       let errorDetailsDiv = document.createElement('div');
       errorDetailsDiv.classList.add('errorDetails');
       errorDetailsDiv.setAttribute('style','display:none;'); 
       let errorMessage = document.createElement('p');
       errorMessage.innerHTML = `Error: ${errorObj.message}`;
       errorDetailsDiv.appendChild(errorMessage);
       return await errorDetailsDiv; 
    }
    catch(error){
     throw error
    }
    }
    
    async  showBugButtonNode(document){
    try{
        let showBugButton = document.createElement('button');
    showBugButton.classList.add('showDetailsButton');
    showBugButton.setAttribute('type','button');
    showBugButton.setAttribute('style',`background-color: darkseagreen; float: right;
    margin-right: 20px; margin-top: -5px;`); 
    showBugButton.setAttribute('onclick','toggleErrorDetails(this)');
    showBugButton.innerHTML = `&#128030`;
    return await showBugButton;
    }
    catch(error){
     throw error
    }
    } 


   async calcPassPercentage(totalTests,totalPassed){


    const passPercentage = await (parseInt(totalPassed)/parseInt(totalTests)) * 100;
    await console.log(passPercentage);
    if(passPercentage === 100){
       return "0";
    }
    else if((90 <= passPercentage) &&(passPercentage <= 99)){
        return await "1";
    }
    else if((80 <= passPercentage) &&(passPercentage <= 89)){
        return await  "2";
    }
    else if((70 <= passPercentage) &&(passPercentage <= 79)){
        return await "3";
    }
    else if((60 <= passPercentage) &&(passPercentage <= 69)){
        return await "4";
    }
    else if((50 <= passPercentage) &&(passPercentage <= 59)){
        return await "5";
    }
    else if((40 <= passPercentage) &&(passPercentage <= 49)){
        return await "6";
    }
    else if((30 <= passPercentage) &&(passPercentage <= 39)){
        return await "7";
    }
    else if((20 <= passPercentage) &&(passPercentage <= 29)){
        return await "8";
    }
    else if((10 <= passPercentage) &&(passPercentage <= 19)){
        return await "9";
    }
    else if((1 <= passPercentage) &&(passPercentage <= 9)){
        return await "10";
    }
    else if(passPercentage === 0){
        return await "11";
    }
   }    



}

module.exports = HtmlBuilder;