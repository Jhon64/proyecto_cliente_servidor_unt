import express, { Router, Response, Request } from "express"
import { UsuarioControl } from "../controladores/Usuario.control";
import { UsuarioRequest } from "../dto/request/usuarioRequest";
import { PersonaRequest } from '../dto/request/personaRequest';
import { send } from "process";

let control = new UsuarioControl()
let router = Router();
router.get("/listar", async (req: Request, res: Response) => {
    res.status(200).send(await control.listarPersonas());
})

router.post("/registrar", async (req: Request, res: Response) => {
    let personaRequest = new UsuarioRequest();
    personaRequest = req.body;
    let result = await control.registrar(personaRequest);
    res.send(result);
})

router.delete("/eliminar/:id", async (req: Request, res: Response) => {
    let { id } = req.params
    let idnumber = parseInt(id)
    let result = await control.eliminar(idnumber);
    res.send(result);
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
        personaRequest.correo = req.body.correo
        let result = await control.crearUsuario(personaRequest, usuarioRequest)
        console.log(result);
        res.send(result)
    } catch (error) {
        res.status(500).send(error)
    }

})

export default router