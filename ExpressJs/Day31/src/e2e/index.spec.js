import request from "supertest";
import mongoose from "mongoose";
import { createApp } from "../createApp.mjs";

let app;

beforeAll(async () => {
    await mongoose.connect("mongodb://localhost/express")
    .then(() => console.log("Connected to Test Database"))
    .catch((err) => console.log(`Error: ${err}`));
    
    app = createApp();
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();

});

describe("/api/auth", () => {
    it("should return 401 when not logged in", async () => {
        const response = await request(app).get("/api/auth/status");
        expect(response.statusCode).toBe(401);
    });
});