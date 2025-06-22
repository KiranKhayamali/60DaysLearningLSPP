//ES module pattern
// const add = (a, b) => {
//     return a + b;
// };

// export default add;

//2nd pattern
// export default (a, b) => {
//     return a + b;
// };

//3rd pattern
// const add = (a, b) => {
//     return a + b;
// };

// const subtract = (a, b) => {
//     return a - b;
// };

// export default {
    //     add,
    //     subtract,
    // };
    
//4th pattern
export const add = (a, b) => {
    return a + b;
};

export const subtract = (a, b) => {
    return a - b;
};