import { Router } from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { createUserQueryValidationSchema } from "../utils/queryValidationSchema.mjs";
import { createUserValidationSchema } from "../utils/validationSchema.mjs";
import { mockUsers } from "../utils/constants.mjs";
import {  resolveIndexByUserId } from "../utils/middlewares.mjs";

const router = Router(); 

router.get("/api/users", checkSchema(createUserQueryValidationSchema), (request, response) => {
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

router.get("/api/users/:id", resolveIndexByUserId, (request, response) => {
    const {findUserIndex} = request;
    const findUser = mockUsers[findUserIndex];
    if (!findUser) return response.sendStatus(404);
    return response.send(findUser);
});

router.post("/api/users", checkSchema(createUserValidationSchema), (request, response) => {
    const result = validationResult(request);
    console.log(result);

    if (!result.isEmpty()) {
        return response.status(400).send({errors: result.array()});
    };
    
    const data = matchedData(request);
    console.log(data); 
    const newUser = { id: mockUsers[mockUsers.length -1].id +1, ...data };
    mockUsers.push(newUser);
    return response.status(201).send(newUser);
});

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