describe(`running tests in spec 2 file`,async()=>{

    it(`test case 4`,async ()=>{
   
      await  expect(true).to.be.true;
   
    })
   
    it(`test case 5`,async ()=>{
      
      await  expect(false).to.be.false;
    })
   
     it(`test case 6`,async ()=>{
      await    expect(true).to.be.true;
     })
   });