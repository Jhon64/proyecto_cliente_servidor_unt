import { Router, Request, Response } from "express"
import { ReservacionRequest } from '../dto/request/reservacionRequest';
import { ReservacionControl } from '../controladores/Reservacion.control';
const router = Router()
let control = new ReservacionControl()

router.post("/registrar", async (req: Request, res: Response) => {
    try {
        let reservacionRequest = new ReservacionRequest()
        reservacionRequest = req.body
        let result = await control.registrar(reservacionRequest)
        console.log(result)
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.get("/listar", async (req: Request, res: Response) => {
    try {

        let result = await control.listar()
        console.log(result)
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

export default router
