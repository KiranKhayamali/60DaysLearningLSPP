import { mockUsers } from "./constants.mjs";

// const loggingMiddleWare = (request, response, next) => {
//     console.log(`${request.method} - ${request.url}`);
//     next();
// };

// app.use(loggingMiddleWare, (request, response, next) => { //enabling middleware globally and we can implement multiple middleware
//     console.log("Finished Logging......");
//     next();
// }); 

export const resolveIndexByUserId = (request, response, next) => { //Similar code from put, patch and delete request are overrid by middleware
    const { params: {id} } = request;

    const parseID = parseInt(id);
    if (isNaN(parseID)) return response.sendStatus(400); //Invalid id

    const findUserIndex = mockUsers.findIndex((user) => user.id === parseID);
    if (findUserIndex === -1) return response.sendStatus(404); 
    request.findUserIndex = findUserIndex;
    next(); 
};
