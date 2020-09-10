import express, { Router, Response, Request } from "express"
import { ClienteControl } from '../controladores/Cliente.control';
import { PersonaRequest } from '../dto/request/personaRequest';
import { UsuarioRequest } from "../dto/request/usuarioRequest";
import verificarAutenticacion from "../middleware/autenticacion/auth"
import auth from '../middleware/jwt-token';

let control = new ClienteControl()
let router = Router();


router.get("/listar", verificarAutenticacion.verificarToken, async (req: Request, res: Response) => {

    let result = await control.listar()
    res.status(200).json(result);
})

router.post("/registrar", verificarAutenticacion.verificarToken, async (req: Request, res: Response) => {
    try {
        let personaRequest = new PersonaRequest();
        personaRequest = req.body;
        let result = await control.registrar(personaRequest);
        res.status(200).send(result);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
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
router.get("/buscar/:dni", verificarAutenticacion.verificarToken, async (req: Request, res: Response) => {
    try {
        let { dni } = req.params
        res.status(200).send(await control.buscarDni(dni));
    } catch (error) {
        console.log(error)
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
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }

})
export default router