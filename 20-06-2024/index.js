// import fs from 'fs'//ESM
const fs = require('fs');//CJS
const path = require('path')
const readline = require('readline')
const childProcess = require('child_process')
const wifi = require('node-wifi');

//write operation
const fileName = __dirname + "users.json"//Relative path
const writeFileDemo = (filePath, content = "") => {
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.log("ERROR OCCURED WHILE WRITING FILE");
            return;
        }
        console.log("File written succesfull");
    })
}
// writeFileDemo(fileName,JSON.stringify(users))
const users = [
    {
        id: 1,
        name: "Roman Regins",
        age: 50,
    }
]

const newUser = {
    id: 3,
    name: "Johny dow",
    age: 22,
}

const readFileDemo = (filePath) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log("ERROR READING FILE", err)
            return;
        }
        // console.log("File data => ",data) return buffer data
        console.log("File data => ", data.toString())
        const usersData = JSON.parse(data.toString());
        usersData.push(newUser);
        console.log(usersData)
        writeFileDemo(fileName, JSON.stringify(usersData))

    })
}

// readFileDemo(fileName)


//append file

const appendFileDemo = (filePath, content) => {
    fs.appendFile(filePath, "\n ", (err) => {
        if (err) {
            console.log("ERROR WHILE APPENDING DATA TO THE FILE", err)
            return
        }
        console.log("Data added successfuly")
    })
}


// appendFileDemo(fileName,JSON.stringify(newUser))

//delete file

const deleteFileDemo = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.log("ERROR WHILE DELETING FILE", err)
            return;
        }
        console.log("File deleted succesfully")
    })
}
// deleteFileDemo(fileName)

/**
 * fs.rmdir(); //Delete a folder
 * fs.mkdir();//Create a folder
 * fs.access();//check if a file exist
 */

//const fullPath = path.join(__dirname,'files','example.txt')

// const rl = readline.createInterface({
//     input:process.stdin,
//     output:process.stdout,
// })

// rl.question(("Enter Your name: ",(answer) => {
//     console.log(`Hello ${answer}!`)
//     rl.close()
// }))

// childProcess.exec("start notepad")

wifi.init({
    iface: null // network interface, choose a random wifi interface if set to null
});

wifi.scan((error, networks) => {
    if (error) {
      console.log(error);
    } else {
      console.log(networks);
      
    }
  });
  