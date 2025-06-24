const buffer = Buffer.from("Kiran");

buffer.write("Hey"); // Heyan will be the output as buffer overwrites

console.log(buffer);
console.log(buffer.toJSON());
console.log(buffer.toString());

