import express, { Router, Response, Request } from "express"
import { PropietarioControl } from '../controladores/Propietario.control';
import { ServicioControl } from "../controladores/Servicio.control";
import { PropietarioRequest } from '../dto/request/propietarioRequest';
import verificarAutenticacion from "../middleware/autenticacion/auth"
import { ServicioRequest } from '../dto/request/servicioRequest';


let control = new ServicioControl()
let router = Router();


router.get("/listar", verificarAutenticacion.verificarToken, async (req: Request, res: Response) => {

    let result = await control.listar()
    res.status(200).json(result);
})

router.post("/registrar", verificarAutenticacion.verificarToken, async (req: Request, res: Response) => {
    try {
        let servicioRequest = new ServicioRequest();
        servicioRequest = req.body;
        let result = await control.registrar(servicioRequest);
        res.status(200).send(result);
    } catch (error) {
        console.log(error)
        res.status(200).send(error);
    }

})

router.delete("/eliminar/:id", verificarAutenticacion.verificarToken, async (req: Request, res: Response) => {
    try {
        let { id } = req.params
        let idnumber = parseInt(id)
        let result = await control.eliminar(idnumber);
        res.status(200).send(result);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.get("/buscar/:id", verificarAutenticacion.verificarToken, async (req: Request, res: Response) => {
    try {
        let { id } = req.params
        let idnumber = parseInt(id)
        let result = await control.buscar(idnumber);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error)
    }
})

router.put("/actualizar/:id", verificarAutenticacion.verificarToken, async (req: Request, res: Response) => {
    try {
        let { id } = req.params
        let idx = parseInt(id)
        let servicioRequest = new ServicioRequest();
        servicioRequest = req.body;

        let result = await control.actualizar(servicioRequest, idx)
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})


export default router