describe(`running tests in spec 3 file`,async ()=>{

    it(`test case 7`,async ()=>{
   
      await expect(true).to.be.true;
   
    })
   
    it(`test case 8`,async ()=>{
      
      await  expect(false).to.be.false;
    })
   
     it(`test case 9`,async ()=>{
      await    expect(true).to.be.true;
     })
   })