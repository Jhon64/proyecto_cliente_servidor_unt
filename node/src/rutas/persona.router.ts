import express, { Router, Response, Request } from "express"
import { PersonaControl } from '../controladores/Persona.control';
import { PersonaRequest } from '../dto/request/personaRequest';
import verificarAutenticacion from "../middleware/autenticacion/auth"
import auth from '../middleware/jwt-token';

let control = new PersonaControl()
let router = Router();


router.get("/listar", verificarAutenticacion.verificarToken, async (req: Request, res: Response) => {

    let result = await control.listarPersonas()
    res.status(200).json(result);
})

router.post("/registrar", verificarAutenticacion.verificarToken, async (req: Request, res: Response) => {
    try {
        let personaRequest = new PersonaRequest();
        personaRequest = req.body;
        let result = await control.registrar(personaRequest);
        res.status(200).send(result);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }

})

router.delete("/eliminar/:id", verificarAutenticacion.verificarToken, async (req: Request, res: Response) => {
    let { id } = req.params
    let idnumber = parseInt(id)
    let result = await control.eliminar(idnumber);
    res.send(result);
})
router.get("/buscar/:dni", verificarAutenticacion.verificarToken, async (req: Request, res: Response) => {
    try {
        let { dni } = req.params
        res.status(200).send(await control.buscarDni(dni));
    } catch (error) {
        console.log(error)
        res.status(500).send(error);

    }

})

export default router