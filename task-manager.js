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



const getMyTask = () => {
    const tasks = fs.readFileSync(taskFilePath, 'utf-8')
    return JSON.parse(tasks)

}

const saveMyTask = (tasks) => {
    fs.writeFileSync(taskFilePath, JSON.stringify(tasks))
}

const addTask = (task) => {
    const tasks = getMyTask();
    tasks.push({ description: task, completed: false })
    saveMyTask(tasks);
    console.log("Task add successfully!")
}




//listing 

const listTasks = () => {
    const tasks = getMyTask();
    tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task.description} - ${task.completed ? "completed" : "not completed"}`)
    })
}

const completeTask = (taskNo) => {
    const tasks = getMyTask();
    if (tasks[taskNo - 1]) {
        tasks[taskNo - 1].completed = true;
        saveMyTask(tasks);
        console.log("Task marked as completed");
    } else {
        console.warn("Invalid task number");
    }
    return;
}
//updateing


//deleting
const deleteTask = (taskNo) => {
    const tasks = getMyTask();
    if (tasks[taskNo - 1]) {
        const filterdTask = tasks.filter((task, index) => index !== taskNo - 1)
        saveMyTask(filterdTask);
        console.info("Task deleted successfuly")
    } else {
        console.warn("Invalid task number");
    }
    return;
}

function todoManager() {
    rl.question(`what would you like to do?
        1. Add a task : \n
        2. List all tasks : \n
        3.Mark task as compleated  : \n
        4.Delete task : \n
        5.Exit`, (answer) => {
        switch (answer) {
            case "1":
                rl.question("Enter  your task: ", (task) => {
                    // console.log(`Adding task: ${task}`);
                    addTask(task)
                    todoManager()
                })
                break;

            case "2":
                listTasks()
                todoManager()
                break;

            case "3":
                rl.question("Enter the task number you want to complete: ", (taskNo) => {
                    completeTask(+taskNo);
                    todoManager();
                })
                break;

            case "4":
                rl.question("Enter the task number you want to delete: ", (taskNo) => {
                    deleteTask(+taskNo);
                    todoManager();
                })
                break;

            case "5":
                rl.close();
                break;

            default:
                console.log("invalid option")
                todoManager();
        }
    })
}
todoManager();