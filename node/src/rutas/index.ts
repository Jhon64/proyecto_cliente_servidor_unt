import express, { Router, Response, Request } from "express"

let router = Router();
router.get("/", (req: Request, res: Response) => {
    res.send("hola mundo");
})
export default router