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
import pagosRouter from "./rutas/pagos.router"
import servicioRouter from "./rutas/servicio.router"
import empresaServicioRouter from "./rutas/EmpresaServicio.router"
import reservacionRouter from "./rutas/reservacion.router"

import fileUpload from 'express-fileupload'
import cors from "cors"

import squareConnect from "square-connect";

// Set the Access Token
const accessToken =
    "EAAAELlyGbQecjPgiQ0ezYl4n0xRZB1fJf1ncPyz7uFoQG2x-1g56diTg10XLrJL";

// Set Square Connect credentials and environment
const defaultClient = squareConnect.ApiClient.instance;

// Configure OAuth2 access token for authorization: oauth2
const oauth2 = defaultClient.authentications["oauth2"];
oauth2.accessToken = accessToken;

// Set 'basePath' to switch between sandbox env and production env
// sandbox: https://connect.squareupsandbox.com
// production: https://connect.squareup.com
defaultClient.basePath = "https://connect.squareupsandbox.com";

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
        //para que la carpeta uploads sea publica y pueda accedes desde la url

        this.app.use("/uploads", (express.static('./uploads')))
        this.app.use(parser.urlencoded({ extended: true }))
        this.app.use(fileUpload({
            createParentPath: true
        }));
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
        this.app.use("/servicio", servicioRouter)
        this.app.use("/cliente", clienteRouter)
        this.app.use("/pagos", pagosRouter)
        this.app.use("/empresa/servicio", empresaServicioRouter)
        this.app.use("/reservacion", reservacionRouter)
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