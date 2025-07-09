import { Router } from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { createUserQueryValidationSchema } from "../utils/queryValidationSchema.mjs";
import { createUserValidationSchema } from "../utils/validationSchema.mjs";
import { mockUsers } from "../utils/constants.mjs";
import { resolveIndexByUserId } from "../utils/middlewares.mjs";
import { User } from "../mongoose/schemas/user.mjs";
import { hashPassword } from "../utils/helpers.mjs";
import { createUserHandler, getUserByIdHandler } from "../handlers/users.mjs";

const router = Router(); 

router.get("/api/users", checkSchema(createUserQueryValidationSchema), (request, response) => {
    console.log(request.session.id);
    request.sessionStore.get(request.session.id, (err, sessionData) => {
        if (err) {
            console.log(err);
            throw err;
        };
        console.log("Inside Session Store Get");
        console.log(sessionData);
    });
    const result = validationResult(request);
    console.log(result);
    const {query: {filter, value},} = request;
    //When filter and value are undefined
    // if (!filter && !value) return response.send(mockUsers);
    if (filter && value) return response.send(
        mockUsers.filter((user) => user[filter].includes(value)) 
    );
    
    return response.send(mockUsers);
});

router.get("/api/users/:id", resolveIndexByUserId, getUserByIdHandler);

router.post("/api/users", checkSchema(createUserValidationSchema), createUserHandler);

router.put("/api/users/:id",resolveIndexByUserId, (request, response) => {
    const {body, findUserIndex} = request;

    mockUsers[findUserIndex] = {id: mockUsers[findUserIndex].id, ...body};
    return response.sendStatus(200);
});

router.patch("/api/users/:id", resolveIndexByUserId, (request, response) => {
    const {body, findUserIndex, } = request;
    mockUsers[findUserIndex] = {...mockUsers[findUserIndex], ...body};
    return response.sendStatus(200);
});

router.delete("/api/users/:id", resolveIndexByUserId, (request, response) => {
    const {findUserIndex} = request;
    mockUsers.splice(findUserIndex, 1); //delete the item
    return response.sendStatus(200);
});

export default router; 