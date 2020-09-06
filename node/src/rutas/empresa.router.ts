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
        let empresaRequest = new EmpresaRequest();
        empresaRequest = req.body;
        let result = await control.registrar(empresaRequest);
        res.send(result);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }

})

router.delete("/eliminar/:id", async (req: Request, res: Response) => {
    let { id } = req.params
    let idnumber = parseInt(id)
    let result = await control.eliminar(idnumber);
    res.send(result);
})


router.get("/buscar/ruc/:ruc", async (req: Request, res: Response) => {
    try {
        let { ruc } = req.params
        let result = await control.buscarRuc(ruc);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get("/buscar/:id", async (req: Request, res: Response) => {
    try {
        let { id } = req.params
        let idx = parseInt(id)
        let result = await control.buscar(idx);
        res.status(200).send(result);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
})

router.put("/actualizar/:id", async (req: Request, res: Response) => {
    try {
        let { id } = req.params
        let idx = parseInt(id)
        let empresaRequest = new EmpresaRequest();
        empresaRequest = req.body;
        console.log(empresaRequest)
        let result = await control.actualizar(empresaRequest, idx)
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})


export default router