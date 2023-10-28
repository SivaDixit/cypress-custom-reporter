const fs = require('fs');

const months = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December" 
}

class FileUtils{

       

async createJsonFile(jsonArray){

let file = new String(jsonArray[0].file);
const fileName =  await file.substring(file.lastIndexOf("\\")+1,file.indexOf('.cy.js'));
await console.log(fileName);
let temp = {};
temp["filename"] = fileName;
jsonArray.push(temp);
if(!await fs.existsSync('cypress/reports/jsons')){
  await fs.mkdirSync('cypress/reports/jsons');
}
await fs.writeFileSync("cypress/reports/jsons/"+fileName+'.json',JSON.stringify(jsonArray, null, 2), 'utf8');   


}


async changeDateFormat(rawDateTime){

    let rawDate = rawDateTime.toString().split('T');
    rawDate = rawDate[0].toString().split('-').reverse();
    let monthNum = rawDate[1].toString();
    for(const month in months){
  
        if(monthNum === month){

            return rawDate[0] + ' ' + months[monthNum] + ' ' + rawDate[2];
        }
       

    } 


}



async changeTimeFormat(){
    let time = new Date().toLocaleTimeString();
    let runEndTime = time.replaceAll(':','_');
    console.log(runEndTime);
   return runEndTime;
}

async getFilesFromJsonFolder(filePath){

    const files = await fs.readdirSync(filePath);

    return await files; 

}

async readJsonFileFromFolder(file){
 
   let data = await fs.readFileSync(file,'utf8');
   let jsonData = JSON.parse(data);
   return await jsonData;

}
async deleteJsonFolder(folderPath){

    await fs.rmdirSync(folderPath);
}

async deleteFilesFromFolder(folderPath,files){
   for(let i=0;i<files.length;i++){
    let filePath = folderPath + "/"+files[i];
    await fs.unlinkSync(filePath);
   }
}

async extractSpecFileName(specFilePath){
    specFilePath = await new String(specFilePath);
    let fileName =  await specFilePath.substring(specFilePath.lastIndexOf("\\")+1,specFilePath.indexOf('.cy.js'));
    return await fileName;

}
}

module.exports = FileUtils;