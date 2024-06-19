//we will be creating a task/todo manager



//we will be storing our tasks in json format in a file

const fs = require("fs")
const path = require("path")
const readline = require('readline')



// console.log(path.join(__dirname,"../newfile"))

const taskFilePath = path.join(__dirname, "task.json");

//Ensure the file exists
if (!fs.existsSync(taskFilePath)) {
    console.log("file does not exist,create it now")
    fs.writeFileSync(taskFilePath, JSON.stringify([]));
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
// rl.question("what is your name", (input) => {
//     console.log(`Hello ${input}`)
//     rl.close()
// })

//add a task

const getMyTask = () => {
    const tasks = fs.readFileSync(taskFilePath,'utf-8')
    return JSON.parse(tasks)
   
}

const saveMyTask = (tasks) => {
    fs.writeFileSync(taskFilePath,JSON.stringify(tasks))
}

const addTask=(task) => {
   const tasks= getMyTask();
   tasks.push({description:task,completed:false})
   saveMyTask(tasks);
   console.log("task add successfully!")
}
function todoManager() {
    rl.question("what would you like to do?\n. Add a task", (answer) => {
        switch (answer) {
            case "1":
                rl.question("Enter  your task: ",(task) => {
                    console.log(`Adding task: ${task}`);
                    addTask(task)
                })
                
                break;
            default:
                console.log("invalid option")
                todoManager();
        }
    })
}

todoManager();

//listing 
//updateing
//deleting
