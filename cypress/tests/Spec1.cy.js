
import promisify from 'cypress-promise';
describe(`running tests in spec 1 file`, async  ()=> {
  it(`test case 1`, async ()=> {
    await expect(true).to.be.true;
  });

  it(`test case 2`, async  ()=> {
   await  expect(false).to.be.false;
  });

  it(`test case 3`,async   ()=> {
   await  expect(true).to.be.false;
  });

  it(`test case 4`,async  ()=> {
   await  expect(true).to.be.true;
  });

  it(`test case 5`, async ()=> {
   await  expect(false).to.be.false;
  });

  it(`test case 6`, async ()=> {
   await expect(true).to.be.false;
  });

  it(`test case 7`,async ()=> {
   await  expect(true).to.be.true;
  });

  it(`test case 8`,async ()=> {
   await expect(false).to.be.false;
  });

  it(`test case 9`,async ()=> {
   await expect(true).to.be.false;
  });

  it(`test case 10`,async ()=> {
   await expect(true).to.be.true;
  });

  it(`test case 11`,async ()=> {
   await expect(false).to.be.false;
  });

  it(`test case 12`,async ()=> {
   await expect(true).to.be.false;
  });

  it(`test case 13`,async ()=> {
   await expect(true).to.be.true;
  });

  it(`test case 14`,async ()=> {
   await expect(false).to.be.false;
  });

  it(`test case 15`,async ()=> {
   await expect(true).to.be.false;
  });

  it(`test case 16`,async ()=> {
   await expect(true).to.be.true;
  });

  it(`test case 17`,async ()=> {
     expect(false).to.be.false;
  });

  it(`test case 18`,async ()=> {
   await expect(true).to.be.false;
  });

  it(`test case 19`,async ()=> {
   await  expect(true).to.be.true;
  });

  it(`test case 20`,async ()=> {
   await expect(false).to.be.false;
  });

  it(`test case 21`,async ()=> {
     await expect(true).to.be.false;
  });
});
