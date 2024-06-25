// const greetUser = (userName) => {
//     console.log(`Hello, ${userName}`);
// };

// const greetWithSalutation = (saltutaion, userName) => {
//     console.log(`Hello ${saltutaion}. ${userName}`);
// };

// const sayHi = (userName) => {
//     console.log(`Hi ${userName}`)
// }
// // export default greetUser; // ESM
// module.exports = {
//     greetUser,
//     greetWithSalutation,
//     sayHi
// }; // CJS


// const greet = require("sanjay-lgtm")
// const Color = require('color');
// //const chalk = require("chalk")
// greet.sayHi();
// greet.greetUser("ABCD");
// const color = Color('#7743CE').alpha(0.5).lighten(0.5);


// //console.log(chalk.backgroundColorNames("HELLO"));//Hello Sanjay!
// console.log(color.hsl().string());  // 'hsla(262, 59%, 81%, 0.5)'

// console.log(color.cmyk().round().array());  // [ 16, 25, 0, 8, 0.5 ]

// console.log(color.ansi256().object()); 


const greetUser = (userName) => {
    console.log(`Hello, ${userName}`);
  };
  
  const greetWithSalutation = (saltutaion, userName) => {
    console.log(`Hello ${saltutaion}. ${userName}`);
  };
  
  const sayHi = () => {
    console.log("Hi There!");
  };
  
  // export default greetUser; // ESM
  module.exports = {
    greetUser,
    greetWithSalutation,
    sayHi,
  }; // CJS