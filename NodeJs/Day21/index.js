// console.log("Hello from index.js");

//Local module
// const add = require("./add");
// const sum = add (1, 2);
// const sum2 = add (3, 6);
// console.log(sum);
// console.log(sum2);

//Module scope
// require("./batman");
// require("./superman");

//module caching
// const superHero = require("./superHero");
// console.log(superHero.getName());
// superHero.setName("SuperMan");
// console.log(superHero.getName());

// const newSuperHero = require("./superHero");
// console.log(superHero.getName()); //because of module caching here output will be superman instead of batman

//dealing with different scenarios in module caching
const SuperHero = require("./superHero")

const spiderman = new SuperHero("SpiderMan");
console.log(spiderman.getName());
spiderman.setName("Peter Parker");
console.log(spiderman.getName());

const ironman = new SuperHero("IronMan");
console.log(ironman.getName());
