import request from "supertest";
import express from "express";

const app = express();

app.get("/hello", (req, res) => res.sendStatus(200));

describe("hello endpoint", () => {
    it("get /hello and expect 200", async () => {
        //request(qpp).get("/hello").expect(201).end((err, res) => { //this method is not praticable as it responds passed even in case of failure
            // if (err) throw err;
            // expect(res.statusCode).toBe(200);
        // })

        const response = await request(app).get("/hello");
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({msg: "invalid"});
    })
})