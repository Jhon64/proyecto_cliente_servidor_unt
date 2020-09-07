import { Response, Request, NextFunction } from "express"
import jwt from "../jwt-token"
import { UsuarioControl } from "../../controladores/Usuario.control"

let control = new UsuarioControl();

let Auth = {
    verificarToken: async (req: Request, res: Response, next: NextFunction) => {
        let { authorization } = req.headers;

        if (authorization != undefined) {
            let token = authorization.slice(7, authorization.length)
            if (token !== "null") {
                let descifrarToken = jwt.decodificar(token)
                let esValido = await control.buscar(descifrarToken)
                console.log(descifrarToken)
                console.log(esValido)
                esValido ? next() : res.status(401).json({ "mensaje": "token incorrecto" })

            } else {
                console.log("no se envio token de autorizacion")
                res.status(401).json({ "mensaje": "no se envio token de autorizacion" })
            }


        } else {
            console.log("no se envio token de autorizacion")
            res.status(401).json({ "mensaje": "no se envio token de autorizacion" })
        }

    }
}

export default Auth