import validator from "express-validator";
import { getUserByIdHandler, createUserHandler } from "../handlers/users.mjs";
import { mockUsers } from "../utils/constants.mjs";
import * as helpers from "../utils/helpers.mjs";
import { User } from "../mongoose/schemas/user.mjs";

jest.mock("express-validator", () => ({
    validationResult: jest.fn(() => ({
        isEmpty: jest.fn(() => false),
        array: jest.fn(() => [{ msg: "Invalid field"}]),
    })),
    matchedData: jest.fn(() => ({
        username: "test",
        displayName: "test_name",
        password: "password",
    })),
}));

jest.mock("../utils/helpers.mjs", () => ({
    hashPassword: jest.fn((password) => `hashed_${password}`),
}));

jest.mock("../mongoose/schemas/user.mjs");

const mockRequest = {
    findUserIndex: 3,
};

const mockResponse = {
    sendStatus: jest.fn(),
    send: jest.fn(),
    status: jest.fn(() => mockResponse),
};

describe("get users", () => {
    it("should get user by id", () => {
        getUserByIdHandler(mockRequest, mockResponse);
        expect(mockResponse.send).toHaveBeenCalled();
        expect(mockResponse.send).toHaveBeenCalledWith(mockUsers[3]);
        expect(mockResponse.send).toHaveBeenCalledTimes(1);
    });

    it("should call sendStatus with 404 when user not found", () => {
        const copyMockRequest = { ...mockRequest, findUserIndex: 100};
        getUserByIdHandler(copyMockRequest, mockResponse);
        expect(mockResponse.sendStatus).toHaveBeenCalled();
        expect(mockResponse.sendStatus).toHaveBeenCalledWith(404);
        expect(mockResponse.sendStatus).toHaveBeenCalledTimes(1);

    });
});

describe("create users", () => {

    it("should status of 400 when there are errors", async () => {
        await createUserHandler(mockRequest, mockResponse);
        expect(validator.validationResult).toHaveBeenCalled();
        expect(validator.validationResult).toHaveBeenCalledWith(mockRequest);
        expect(mockResponse.status).toHaveBeenCalledWith(400); 
        expect(mockResponse.send).toHaveBeenCalledWith([{ msg: "Invalid field"}]); 
    });

    it("should return status of 201 and the user created", async () => {
        jest.spyOn(validator, "validationResult").mockImplementationOnce(() => ({
            isEmpty: jest.fn(() => true),
        }));

        const saveMethod = jest.spyOn(User.prototype, "save").mockResolvedValueOnce({
            id: 1,
            username: "test",
            displayName: "test_name",
            password: "hashed_password",
        });

        await createUserHandler(mockRequest, mockResponse);
        expect(validator.matchedData).toHaveBeenCalledWith(mockRequest);
        expect(helpers.hashPassword).toHaveBeenCalledWith("password");
        expect(helpers.hashPassword).toHaveReturnedWith("hashed_password");
        expect(User).toHaveBeenCalledWith({
            username: "test",
            displayName: "test_name",
            password: "hashed_password",
        });

        expect(saveMethod).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenLastCalledWith(201);
        expect(mockResponse.send).toHaveBeenLastCalledWith({
            id: 1,
            username: "test",
            displayName: "test_name",
            password: "hashed_password",
        });
    });

    it("send status of 400 when database fails to save user", async () => {
        jest.spyOn(validator, "validationResult").mockImplementationOnce(() => ({
            isEmpty: jest.fn(() => true),
        }));

        const saveMethod = jest.spyOn(User.prototype, "save").mockImplementationOnce(() => Promise.reject("Failed to save user"));

        await createUserHandler(mockRequest, mockResponse);
        expect(saveMethod).toHaveBeenCalled();
        expect(mockResponse.sendStatus).toHaveBeenCalledWith(400);
    });
});