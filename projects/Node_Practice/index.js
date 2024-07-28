// Node js ==> Node js is an open source ,creoss plateform , runtime env. for developung server side and networking application.
// Node js is built on chrome v8 js engine.
// Node js is used for creating server side application , web application , mobile application , desktop application ,
// Node js is used for creating real time application , real time data streaming , real time data processing

// REPL ==> read eval print loop, It represents a compouter env. like a window connsole or unix shall where a command is entered and the system repondes with an output.


// Asynchronous ==> Asyncronous code refers to the style of programming where operations are executed independently of the main program flow.Instead of waiting for 
// each operation  to compleate before moving on to the next one, 

//use async operations ==> use of callbacks, promises,async/await,

// Non blocking code ==> refers to the ability of a program

// pipe ==> method is used to direct the output of one stream to the input of another stream.

// import fs from 'fs';

// const readableStrem = fs.createReadStream('input.txt');
// const writableStream = fs.createWriteStream('output.txt');

// readableStrem.pipe(writableStream);


// const result = [1,2,3,4,5]
// .map(num => num * 2)
// .filter(num => num > 5)
// .reduce((acc,num) => acc + num, 0)

// console.log(result);

//control flow function ==>
// Buffer ===> temporary memory , mainly used to stream to hold some data until consumed.

// const str = "hey. this is a string!";

// const buff = Buffer.from(str,"utf-8");
// console.log(buff);

// buff.toString(encoding);
// buff.toString(encoding,0,numberOfBytes

// Stream ==> Stream is an object that allows us to transfer data from source to destgination..

// Two types of stream ==>
//     1. Readable Stream => reading a file line by line.
//     2 .Writable Stream => Writeing  a file line by line.Readable

// 1 Readable Stream ==> 

// import fs, { read } from 'fs';
// import readline from 'readline';

// const readableStrem = fs.createReadStream('file.txt');

// const readlineInterface = readline.createInterface({
//     input: readableStrem,
//     output: process.stdout
// });
// readlineInterface.on('line',(line) => {
//     console.log(line);
// })

// 2.WritableStream ==> 
//     const writableStream = fs.createWriteStream('output.txt');
// writableStream.write('Hello, ');
// writableStream.write('world!');
// writableStream.end();


// 3.Duplex Stream ==> allowing both data input and output . Example (TCP socket).
// import net from 'net';

// const server = net.createServer((socket) =>{
//     socket.pipe(socket);
// });
// server.listen(3000);

// 4.Transfer Stream => transformattion of data as it is read and write.

// import fs from 'fs';
// import zlib from 'zlib'

// const readableStrem =  fs.createReadStream.apply('file.txt');
// const writableStream = fs.createWriteStream('file.txt.gz');

// const gzipStream = zlib.createGzip();
// readableStrem.pipe(gzipStream).pipe(writableStream);


// What are processes and threads and How do they communicate 
// between multiple threads and processes?


// Diff bw PUT,POST,and PATCH
// PUT is used to update an existing resource
// POST is used to create a new resource
// PATCH is used to update a part of an existing resource

// Crypto module ==>

// import crypto from 'crypto';

// const password = 'sanjay';

// const salt = crypto.randomBytes(16).toString('hex');

// const hash = crypto.pbkdf2Sync(password,salt,100000,64,'sha512').toString('hex');
// console.log('SALT' ,salt);
// console.log('Hash',hash);

// bcrypt module ==>

// import bcrypt from 'bcrypt';

// const password = 'sanjay';
// const saltRound = 10

// bcrypt.hash(password,saltRound,function(err,hash){
//     if(!err){
//         console.log('Hashed password: ',hash);
//     }
// })


// req.params ==>req.params is an object containing properties
//  mapped to the named route parameters
// app.get('/user/:id', (req, res) => {
//     const userId = req.params.id;
// })

// req.query is an object containing a
//  property for each query string parameter in the route


// Route definition
// app.get('/search', (req, res) => {
//     const city = req.query.city; // Access the "city" query parameter
//     const active = req.query.active; // Access the "active" query parameter
//     // Use city and active for searching
// });

// dependency =>
    // pakages that are required for the application to run in the production env.

// DevDependecies => only needed development and testing purposes


//cron job ==> time based job schedular.

// import express from "express";

// import cron from 'node-cron';
// const app = express();

// // Define a route
// app.get('/', (req, res) => {
//   res.send('Hello, world!');
// });

// // Schedule a cron job
// cron.schedule('0 0 * * *', () => {
//   console.log('Running a scheduled task every day at midnight');
// });

// // Start the server
// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

//file upload ====>

  // import express from "express";
  // import multer from "multer";

  // const upload = multer({
  //   dest:'uploads/'
  // });

  // const app = express();

  // app.post('/upload',upload.single('file'),(req,res)=>{
  //   res.send('File uploaded successfully!')
  // })

  // app.listen(3000,()=>{
  //   console.log('Server is running on port 3000')
  // })

  