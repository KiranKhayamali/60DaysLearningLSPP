import request from "supertest";
import mongoose from "mongoose";
import { createApp } from "../createApp.mjs";

let app;

beforeAll(async () => {
    await mongoose.connect("mongodb://localhost/express_test")
    .then(() => console.log("Connected to Test Database"))
    .catch((err) => console.log(`Error: ${err}`));
    
    app = createApp();
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();

});

describe("create user and login", () => {
    it("should create the user", async () => {
        const response = await request(app).post("/api/users").send({
            username: "test",
            displayName: "Testing the database",
            password: "password",
        });
        expect(response.statusCode).toBe(201);
    });

    it("should log the user in and visit /api/auth/status", async () => {
        const response = await request(app).post("/api/auth").send({
            username: "test",
            password: "password"
        }).then((res) => {
            return request(app).get("/api/auth/status").set("Cookie", res.headers["set-cookie"]);
        });
        expect(response.statusCode).toBe(200);
    });

    it("should visit /api/auth/status and return authenticated user", async () => {
        const response = await request(app).get("/api/auth/status");
        expect(response.statusCode).toBe(200);
    });
});