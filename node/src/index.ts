import { Aplicacion } from "./app"
import "reflect-metadata";
async function main() {
  let app = new Aplicacion();
  await app.montarServidor()
}

main()