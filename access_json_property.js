const json = [
    [
      {
        "suiteName": "running tests in spec 1 file",
        "testcases": [
          {
            "running tests in spec 1 file test case 1": "pass"
          },
          // ... (other testcases)
        ],
        "total": 21,
        "file": "cypress\\tests\\Spec1.cy.js",
        "passed": 14,
        "failed": 7
      },
      {
        "filename": "Spec1"
      }
    ],
    // ... (other suites)
  ];
  
  // Loop through the JSON array
  for (const suite of json) {
    for (const data of suite) {
      if (data.suiteName) {
        // Extract suiteName
        const suiteName = data.suiteName;
        console.log(`Suite Name: ${suiteName}`);
  
        // Loop through the testcases array
        for (const testcase of data.testcases) {
          // Extract testcase name and result
          const testcaseName = Object.keys(testcase)[0];
          const testcaseResult = testcase[testcaseName];
          console.log(`Testcase: ${testcaseName}, Result: ${testcaseResult}`);
        }
  
        // Extract total, passed, failed, and file properties
        const total = data.total;
        const passed = data.passed;
        const failed = data.failed;
        const file = data.file;
        console.log(`Total: ${total}, Passed: ${passed}, Failed: ${failed}`);
        console.log(`File: ${file}`);
      }
    }
  }