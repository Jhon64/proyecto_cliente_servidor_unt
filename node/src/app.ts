import express, { Application, json } from "express"
import morgan from "morgan";
import parser from "body-parser"
import Rutas from './rutas/index';
import { Connection, createConnection, getConnection } from "typeorm"
import personaRouter from "./rutas/persona.router"
import indexRouter from "./rutas/index"
import usuarioRouter from "./rutas/usuario.router"
import empleadoRouter from "./rutas/empleado.router"
import empresaRouter from "./rutas/empresa.router"
import autenticarRouter from "./rutas/autenticar.router"
import propietarioRouter from "./rutas/propietario.router"
import clienteRouter from "./rutas/cliente.router"
import cors from "cors"

export class Aplicacion {
    private app: Application;
    constructor(private puerto?: number | string) {
        this.app = express()
        this.middlewares()
        this.configuraciones()
        this.rutas()
        this.database()
    }

    middlewares() {
        this.app.use(morgan("dev"))
        this.app.use(cors())
        this.app.use(parser.json())
        this.app.use(parser.urlencoded({ extended: true }))

    }

    configuraciones() {
        this.app.set("port", process.env.PORT || 4000)
    }
    rutas() {

        this.app.use(indexRouter)
        this.app.use("/persona", personaRouter)
        this.app.use("/usuario", usuarioRouter)
        this.app.use("/empleado", empleadoRouter)
        this.app.use("/empresa", empresaRouter)
        this.app.use("/propietario", propietarioRouter)
        this.app.use("/cliente", clienteRouter)
        this.app.use("/", autenticarRouter)
    }
    async database() {
        const connection: Connection = await createConnection();
        const isConnect = getConnection();
        if (isConnect.isConnected) {
            console.log("basw de datos conectada")
        } else {
            throw new Error("base de datos no conectada")
        }

    }
    montarServidor() {
        this.app.listen(this.app.get("port"), () => {
            console.log("cargando servidor http://localhost:" + this.app.get("port"))
        })
    }
}