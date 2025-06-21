(function (message){
    const superHero = "Batman";
    console.log(message, superHero);
}) ("Hello");//Hello is the parameter passed in iife

//Each function has their own scope
(function (message){
    const superHero = "SuperMan";
    console.log(message, superHero);
}) ("Hey");