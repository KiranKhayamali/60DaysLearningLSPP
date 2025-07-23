const User = require("../models/User") 
const { seedUsers } = require("./fixtures.js");

beforeEach(async () => {
    await seedUsers();
});

test("should fetch users", async () => {
    const users = await User.find();
    expect(users.length).toBe(2);
});