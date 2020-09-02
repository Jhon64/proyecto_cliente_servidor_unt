import { Response, Request, NextFunction } from "express"
import jwt from "../jwt-token"
import { UsuarioControl } from "../../controladores/Usuario.control"

let control = new UsuarioControl();

let Auth = {
    verificarToken: (req: Request, res: Response, next: NextFunction) => {
        let { authorization } = req.headers;

        if (authorization != undefined) {
            let token = authorization.slice(7, authorization.length)
            if (token !== "null") {
                let descifrarToken = jwt.decodificar(token)
                let esValido = control.buscar(descifrarToken)
                esValido ? next() : res.status(401).json({ "mensaje": "token incorrecto" })
            } else {
                res.status(401).json({ "mensaje": "no se envio token de autorizacion" })
            }


        } else {
            res.status(401).json({ "mensaje": "no se envio token de autorizacion" })
        }

    }
}

export default Auth