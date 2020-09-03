import express, { Router, Response, Request } from "express"
import { PropietarioControl } from '../controladores/Propietario.control';
import { PropietarioRequest } from '../dto/request/propietarioRequest';
import verificarAutenticacion from "../middleware/autenticacion/auth"


let control = new PropietarioControl()
let router = Router();


router.get("/listar", async (req: Request, res: Response) => {

    let result = await control.listar()
    res.status(200).json(result);
})

router.post("/registrar", async (req: Request, res: Response) => {
    let propietarioRequest = new PropietarioRequest();
    propietarioRequest = req.body;
    let result = await control.registrar(propietarioRequest);
    res.send(result);
})

router.delete("/eliminar/:id", async (req: Request, res: Response) => {
    let { id } = req.params
    let idnumber = parseInt(id)
    let result = await control.eliminar(idnumber);
    res.send(result);
})


export default router