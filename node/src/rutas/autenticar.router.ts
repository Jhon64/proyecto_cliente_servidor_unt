import express, { Router, Response, Request } from "express"
import { UsuarioControl } from "../controladores/Usuario.control";
import { UsuarioRequest } from '../dto/request/usuarioRequest';

let control = new UsuarioControl()
let router = Router();

router.post("/login", async (req: Request, res: Response) => {
    try {
        let usuarioRequest = new UsuarioRequest();
        usuarioRequest = req.body;
        let result = await control.verificarCredenciales(usuarioRequest);
        //@ts-ignore
        if (result.token) {
            //@ts-ignore
            res.status(200).json({ token: result.token })
        } else {
            res.status(401).json({ mensaje: "clave y/o usuario incorrectos" })
        }
    } catch (error) {
        res.status(500).send(error)
    }

})






export default router