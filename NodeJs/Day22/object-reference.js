const obj1 = {
    name: "Peter Parker",
};

// const obj2 = obj1;
// obj2.name = "Tony Stark"; //it update obj1 also

let obj2 = obj1;
obj2 = { //this changes obj2 only
    name: "Tony Stark",
};

console.log(obj1);