// import fs from 'fs'//ESM
const fs = require('fs');//CJS


//write operation

const writeFileDemo = () => {
    fs.writeFile("sample.txt","Hello there!",(err)=>{
        if(err){
            console.log("ERROR OCCURED WHILE WRITING FILE");
            return;
        }
        console.log("File written succesfull");
    })
}

const readFileDemo = () => {
    fs.readFile("sample.txt",(err,data) => {
        if(err){
            console.log("ERROR READING FILE",err)
            return;
        }
        // console.log("File data => ",data) return buffer data
        console.log("File data => ",data.toString())
    })
}
readFileDemo()