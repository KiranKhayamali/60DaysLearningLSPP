//Import Export Patterns
// const add = (a, b) => {
//     return a + b;
// };

// const subtract = (a, b) => {
//     return a - b;
// };

// module.exports = { //It export module as object
//     add,
//     subtract,
// };

//2nd pattern for exporting functions
module.exports.add = (a, b) => {
    return a + b;
};

module.exports.subtract = (a, b) => {
    return a - b;
};

//3rd pattern This pattern is not better to use
exports.add = (a, b) => {
    return a + b;
};

exports.subtract = (a, b) => {
    return a - b;
};