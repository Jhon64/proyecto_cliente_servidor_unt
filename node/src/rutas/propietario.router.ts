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
    try {
        let propietarioRequest = new PropietarioRequest();
        propietarioRequest = req.body;
        let result = await control.registrar(propietarioRequest);
        res.status(200).send(result);
    } catch (error) {
        console.log(error)
        res.status(200).send(error);
    }

})

router.delete("/eliminar/:id", async (req: Request, res: Response) => {
    try {
        let { id } = req.params
        let idnumber = parseInt(id)
        let result = await control.eliminar(idnumber);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get("/buscar/:id", async (req: Request, res: Response) => {
    try {
        let { id } = req.params
        let idnumber = parseInt(id)
        let result = await control.buscar(idnumber);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error)
    }
})

router.put("/actualizar/:id", async (req: Request, res: Response) => {
    try {
        let { id } = req.params
        let idx = parseInt(id)
        let propietarioRequest = new PropietarioRequest();
        propietarioRequest = req.body;
        console.log(propietarioRequest)
        let result = await control.actualizar(propietarioRequest, idx)
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})


export default router