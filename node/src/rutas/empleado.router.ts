import express, { Router, Response, Request } from "express"
import { EmpleadoControl } from '../controladores/Empleado.control';
import { EmpleadoRequest } from '../dto/request/empleadoRequest';
import verificarAutenticacion from "../middleware/autenticacion/auth"


let control = new EmpleadoControl()
let router = Router();


router.get("/listar", async (req: Request, res: Response) => {
    try {
        let result = await control.listarEmpleados()
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

})

router.post("/registrar", async (req: Request, res: Response) => {
    try {

        let empleadoRequest = new EmpleadoRequest();
        empleadoRequest = req.body;
        let result = await control.registrar(empleadoRequest);
        console.log(">>>>>>>>>>>>")
        console.log(result)
        res.status(200).send(result);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)

    }

})

router.delete("/eliminar/:id", async (req: Request, res: Response) => {
    let { id } = req.params
    let idnumber = parseInt(id)
    let result = await control.eliminar(idnumber);
    res.send(result);
})


export default router