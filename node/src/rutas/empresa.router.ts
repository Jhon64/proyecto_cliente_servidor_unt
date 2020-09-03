import express, { Router, Response, Request } from "express"
import { EmpresaControl } from '../controladores/Empresa.control';
import { EmpresaRequest } from '../dto/request/empresaRequest';
import verificarAutenticacion from "../middleware/autenticacion/auth"


let control = new EmpresaControl()
let router = Router();


router.get("/listar", async (req: Request, res: Response) => {

    let result = await control.listarEmpresas()
    res.status(200).json(result);
})

router.post("/registrar", async (req: Request, res: Response) => {
    try {
        let empleadoRequest = new EmpresaRequest();
        empleadoRequest = req.body;
        let result = await control.registrar(empleadoRequest);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }

})

router.delete("/eliminar/:id", async (req: Request, res: Response) => {
    let { id } = req.params
    let idnumber = parseInt(id)
    let result = await control.eliminar(idnumber);
    res.send(result);
})


export default router