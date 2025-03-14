import express, { Router, Response, Request } from "express"
import { UsuarioControl } from "../controladores/Usuario.control";
import { UsuarioRequest } from "../dto/request/usuarioRequest";
import { PersonaRequest } from '../dto/request/personaRequest';
import { send } from "process";
import verificarAutenticacion from "../middleware/autenticacion/auth"
let control = new UsuarioControl()
let router = Router();
router.get("/listar", verificarAutenticacion.verificarToken, async (req: Request, res: Response) => {
    res.status(200).send(await control.listarPersonas());
})



router.post("/registrar", verificarAutenticacion.verificarToken, async (req: Request, res: Response) => {
    try {
        let usuarioRequest = new UsuarioRequest();
        usuarioRequest = req.body;
        console.log(usuarioRequest)
        console.log(req.body)
        let result = await control.registrar(usuarioRequest);
        res.status(200).send(result);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

})

router.delete("/eliminar/:id", verificarAutenticacion.verificarToken, async (req: Request, res: Response) => {
    try {
        let { id } = req.params
        let idnumber = parseInt(id)
        let result = await control.eliminar(idnumber);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }

})

router.post("/crear", async (req: Request, res: Response) => {

    try {
        let usuarioRequest: UsuarioRequest = new UsuarioRequest()
        let personaRequest: PersonaRequest = new PersonaRequest();
        usuarioRequest.clave = req.body.clave;
        usuarioRequest.usuario = req.body.usuario;
        usuarioRequest.rol = req.body.rol;
        personaRequest.nombre = req.body.nombre
        personaRequest.fechaNacimiento = req.body.fechaNacimiento
        personaRequest.apellido = req.body.apellidos
        personaRequest.dni = req.body.dni
        personaRequest.tipo = req.body.tipo
        personaRequest.correo = req.body.correo
        personaRequest.celular = req.body.celular
        let result = await control.crearUsuario(personaRequest, usuarioRequest)
        console.log(result);
        res.send(result)
    } catch (error) {
        res.status(500).send(error)
    }

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

router.get("/buscar/id/:id", verificarAutenticacion.verificarToken, async (req: Request, res: Response) => {
    try {
        let { id } = req.params
        let idx = parseInt(id)
        res.status(200).send(await control.buscarId(idx));
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
})

router.put("/actualizar/:id", verificarAutenticacion.verificarToken, async (req: Request, res: Response) => {
    try {
        let { id } = req.params
        let idx = parseInt(id)
        let usuarioRequest = new UsuarioRequest()
        usuarioRequest = req.body
        let result = await control.actualizar(idx, usuarioRequest)
        res.status(200).send(result);

    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
})

router.post("/verificarAuth", verificarAutenticacion.verificarToken, (req: Request, res: Response) => {
    res.status(200).send({ auth: true, text: "autenticado" })
})

export default router