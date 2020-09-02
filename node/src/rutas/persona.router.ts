import express, { Router, Response, Request } from "express"
import { PersonaControl } from '../controladores/Persona.control';
import { PersonaRequest } from '../dto/request/personaRequest';
import verificarAutenticacion from "../middleware/autenticacion/auth"
import auth from '../middleware/jwt-token';

let control = new PersonaControl()
let router = Router();


router.get("/listar", async (req: Request, res: Response) => {

    let result = await control.listarPersonas()
    res.status(200).json(result);
})

router.post("/registrar", async (req: Request, res: Response) => {
    let personaRequest = new PersonaRequest();
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


export default router