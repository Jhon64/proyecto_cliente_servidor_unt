import express, { Router, Response, Request } from "express"
import { UsuarioControl } from "../controladores/Usuario.control";
import { UsuarioRequest } from "../dto/request/usuarioRequest";

let control = new UsuarioControl()
let router = Router();
router.get("/listar", async (req: Request, res: Response) => {
    res.status(200).send(await control.listarPersonas());
})

router.post("/registrar", async (req: Request, res: Response) => {
    let personaRequest = new UsuarioRequest();
    personaRequest = req.body;
    let result = await control.registrar(personaRequest);
    res.send(result);
})

router.delete("/eliminar/:id", async (req: Request, res: Response) => {
    let { id } = req.params
    let idnumber = parseInt(id)
    let result = await control.eliminar(idnumber);
    res.send(result);
})

router.post("/crear", async (req: Request, res: Response) => {
    let result = req.body
    console.log(result)
    res.send(result);
})

export default router