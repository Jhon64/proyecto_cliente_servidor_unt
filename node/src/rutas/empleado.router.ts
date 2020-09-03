import express, { Router, Response, Request } from "express"
import { EmpleadoControl } from '../controladores/Empleado.control';
import { EmpleadoRequest } from '../dto/request/empleadoRequest';
import verificarAutenticacion from "../middleware/autenticacion/auth"


let control = new EmpleadoControl()
let router = Router();


router.get("/listar", async (req: Request, res: Response) => {

    let result = await control.listarEmpleados()
    res.status(200).json(result);
})

router.post("/registrar", async (req: Request, res: Response) => {
    let empleadoRequest = new EmpleadoRequest();
    empleadoRequest = req.body;
    let result = await control.registrar(empleadoRequest);
    res.send(result);
})

router.delete("/eliminar/:id", async (req: Request, res: Response) => {
    let { id } = req.params
    let idnumber = parseInt(id)
    let result = await control.eliminar(idnumber);
    res.send(result);
})


export default router