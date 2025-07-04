import { Router } from "express";

const router = Router();

router.get("/api/products", (request, response) => {
    response.send([
        {id: 123, name: "Iphone 16", price: "not afordable"}
    ])
});


export default router;