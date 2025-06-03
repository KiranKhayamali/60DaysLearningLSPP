//Normal function
function normal_greeting(){
    return `Namaste!!!`;
}   
console.log(normal_greeting());

//Arrow Function
arrow_greeting = () => {
    return `Olaaa!!!`;
}
console.log(arrow_greeting());

//Arrow function with default value
greeting1 = () => `Konichiwa!!`;
console.log(greeting1());

//Arrow function with value
greeting2 = (value) => `Hello ` + value;
console.log(greeting2("world!!!!"));


