'use strict';
const Mocha = require('mocha');
const   Suite = require('mocha/lib/suite');
const   Test  = require('mocha/lib/test');
const FileUtils = require('./FileUtils');
const fileutils = new FileUtils();
const {
    EVENT_RUN_BEGIN,
    EVENT_RUN_END,
    EVENT_TEST_FAIL,
    EVENT_TEST_PASS,
    EVENT_SUITE_BEGIN,
    EVENT_SUITE_END,
    STATE_STOPPED
  } = Mocha.Runner.constants;
  
  class JSONReporter {
    suiteData = [];
    currentSuite = null;
    passed = 0;
    failed = 0;
    constructor(runner) {
      runner
        .on(EVENT_RUN_BEGIN, async() => {
          console.log('start');
        })
        .on(EVENT_SUITE_BEGIN, async(suite) => {
            
          this.currentSuite = {
            suiteName: suite.title,
            testcases: [],
            total: suite.total(),
           
            
          };
        //   console.log(suite.fullTitle());
        //   console.log(suite.total());
        //   console.log(suite.titlePath());
        })
        .on(EVENT_TEST_PASS, async(test) => {
          if (this.currentSuite) {
            let temp = {};
            temp[test.fullTitle()] = 'pass';
            this.passed++;
            this.currentSuite.testcases.push(temp);
          }
          if(this.currentSuite['file'] === undefined){
            this.currentSuite['file'] = test.parent.parent.file;
          }
        })
        .on(EVENT_TEST_FAIL, async(test, err) => {
          if (this.currentSuite) {
            let temp = {};
            temp[test.fullTitle()] = 'fail';
            let error = {};
            error['message'] = err.message;
            temp['error'] = error;
            this.currentSuite.testcases.push(temp);
            this.failed++;
          }
          if(this.currentSuite['file'] === undefined){
            this.currentSuite['file'] = test.parent.parent.file;
          }
        })
        .on(EVENT_SUITE_END, async() => {
          if (this.currentSuite) {
            this.currentSuite["passed"] = this.passed;
            this.currentSuite["failed"] = this.failed;
            this.suiteData.push(this.currentSuite);
            this.currentSuite = null;
            
          }
        })
        .on(EVENT_RUN_END, async() => {
          //console.log(this.suiteData);
          console.log(JSON.stringify(this.suiteData));
          const strSuiteData = await JSON.stringify(this.suiteData);
          const jsonData = await JSON.parse(strSuiteData);
          await fileutils.createJsonFile(jsonData);
          
        })
        
    }
  }
  
  module.exports = JSONReporter;