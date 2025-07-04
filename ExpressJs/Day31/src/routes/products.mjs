import { raw, Router } from "express";

const router = Router();

router.get("/api/products", (request, response) => {
    console.log(request.headers.cookie);
    console.log(request.cookies);
    console.log(request.signedCookies.hello);
    if (request.cookies.hello && request.cookies.hello === "")
        return response.send([
            {id: 123, name: "Iphone 16", price: "not afordable"}
        ]);

    return response.status(403).send({msg: "Sorry, You need the correct cookies"});
});


export default router;