const greetUser = (userName) => {
    console.log(`Hello, ${userName}`);
};

const greetWithSalutation = (saltutaion, userName) => {
    console.log(`Hello ${saltutaion}. ${userName}`);
};

const sayHi = (userName) => {
    console.log(`Hi ${userName}`)
}
// export default greetUser; // ESM
module.exports = {
    greetUser,
    greetWithSalutation,
    sayHi
}; // CJS


const greet = require("sanjay-lgtm")
const Color = require('color');
//const chalk = require("chalk")
const color = Color('#7743CE').alpha(0.5).lighten(0.5);
// greet.sayHi();

// greet.greetUser("ABCD");

//console.log(chalk.backgroundColorNames("HELLO"));//Hello Sanjay!
console.log(color.hsl().string());  // 'hsla(262, 59%, 81%, 0.5)'

console.log(color.cmyk().round().array());  // [ 16, 25, 0, 8, 0.5 ]

console.log(color.ansi256().object()); 