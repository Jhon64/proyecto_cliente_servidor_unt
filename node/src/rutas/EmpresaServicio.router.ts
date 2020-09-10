import express, { Router, Response, Request } from "express"
import { PropietarioControl } from '../controladores/Propietario.control';
import { ServicioControl } from "../controladores/Servicio.control";
import { PropietarioRequest } from '../dto/request/propietarioRequest';
import verificarAutenticacion from "../middleware/autenticacion/auth"
import { ServicioRequest } from '../dto/request/servicioRequest';
import { EmpresaServicioControl } from '../controladores/EmpresaServicio.control';
import { EmpresaServicioRequest } from '../dto/request/empresaServicioRequest';


let control = new EmpresaServicioControl()
let router = Router();


router.get("/listar", verificarAutenticacion.verificarToken, async (req: Request, res: Response) => {

    let result = await control.listar()
    res.status(200).json(result);
})

router.post("/catalogo", verificarAutenticacion.verificarToken, async (req: Request, res: Response) => {
    try {
        let { idEmpresa, idServicio } = req.body
        console.log(idEmpresa)
        console.log(idServicio)
        let result = await control.listarCatalogo(idEmpresa, idServicio)
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)

    }

})

router.post("/registrar", verificarAutenticacion.verificarToken, async (req: Request, res: Response) => {
    try {
        let servicioRequest = new EmpresaServicioRequest();
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
        let servicioRequest = new EmpresaServicioRequest();
        servicioRequest = req.body;

        let result = await control.actualizar(servicioRequest, idx)
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.post("/subirImagen", async (req: Request, res: Response) => {
    console.log(req.body)
    console.log(req.files)
    try {
        if (!req.files) {
            res.status(500).send({
                status: false,
                message: 'No hay archivos subidos'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.imagen;
            console.log(avatar)
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            //@ts-ignore
            avatar.mv('./uploads/catalogo/' + avatar.name);
            //send response
            let resultUploads = {
                status: true,
                message: 'archivo subido',
                data: {
                    //@ts-ignore
                    name: avatar.name,
                    //@ts-ignore
                    mimetype: avatar.mimetype,
                    //@ts-ignore
                    size: avatar.size
                }
            }
            let empresaServicioRequest = new EmpresaServicioRequest()
            empresaServicioRequest = req.body
            console.log(empresaServicioRequest)
            empresaServicioRequest = req.body
            //@ts-ignore
            empresaServicioRequest.imagen = "uploads/catalogo/" + avatar.name
            let resultRegistro = await control.registrar(empresaServicioRequest)
            res.status(200).send(resultRegistro)
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }

})



export default router