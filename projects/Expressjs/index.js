const express = require('express')

const app = express();

const users = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@doe.com',
        age: 30
    },
    {
        id: 2,
        name: 'Jane Doe',
        email: 'jane@doe.com',
        age: 25
    },
    {
        id: 3,
        name: 'Jne Doe',
        email: 'jne@doe.com',
        age: 20
    }
]

//middleware
const m1 = (req,res,next) => {
    console.log("middlware 1")
    next()
    // res.json({
    //     message: 'res1'
    // })
}



const m2 = (req,res,next) => {
    console.log("middlware 2")
    next()
    // res.json({
    //     message: 'res2'
    // })
}
const m3 = (req,res,next) => {
    console.log("middlware 3")
    next()
    // res.json({
    //     message: 'res3'
    // })
}

app.use(m1);
app.use(m2);
app.use(m3);


app.get("/login", (req, res,next) => {
    console.log("Login api called")
    res.json({
        success: true,
        message: "Login GET Api"
    })
})

app.post("/login", (req, res,next) => {
    res.json({
        success: true,
        message: "Login POST Api"
    })
})


// app.get("/user/:id",(req,res) =>{
//     const params = req.params;
//     // console.log(params)

//     const user = users.find((u) => u.id == params.id)
//     // console.log(user)
//     if(!user){
//         res.status(404).json({
//             success:false,
//             message: "User not found"
//         })
//     }
//     res.json({
//         success:true,
//         message:"Dammy api of users",
//         results:users,
//     })
// })


//By Query parameter =>
//benifits: get all data and specific data

app.get("/user", (req, res,next) => {
    const params = req.query;
    console.log(req.query)

    const user = users.find((u) => u.id == params.userId)
    if (!params.userId) {
        return res.json({
            success: true,
            results: users
        })
    }
    // console.log(user)
    if (!user) {
        res.status(404).json({
            success: false,
            message: "User not found"
        })
    }
    res.json({
        success: true,
        message: "Dammy api of users",
        results: users,
    })
})


app.listen(8000, () => {
    console.log('server is running')
})
