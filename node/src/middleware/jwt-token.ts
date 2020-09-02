import jwt from "jwt-simple"
let secret = "app"

let auth = {
    generarToken(usuario: Object) {
        let token = jwt.encode(usuario, secret)
        return token;
    },
    decodificar(token: string) {
        console.log(token)
        let decode = jwt.decode(token, secret)
        return decode;
    }
}

export default auth