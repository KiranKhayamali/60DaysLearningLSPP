const User = require("../models/User") 

const seedUsers = async () => {
    await User.create([
        {name: "Kiran", email: "Test1@gmail.com"},
        {name: "Ashura", email: "Test2@gmail.com"},
        {name: "Unknown", email: "Test3.@gmali.com"},
    ]);
};

module.exports = { seedUsers };