import "dotenv/config"

import cadastro from "./registrarEventos/cadastro.js";
import documentos from "./registrarEventos/documentos.js";
import inicio from "./registrarEventos/inicio.js";
import registrarEventosLogin from "./registrarEventos/login.js";
import io from "./servidor.js";
import autorizarUsuario from "./middlewares/autorizarUsuario.js";

const nspUsuarios = io.of("/usuarios")

nspUsuarios.use(autorizarUsuario)

nspUsuarios.on("connection", (socket) => {
  inicio(socket, nspUsuarios)
  documentos(socket, nspUsuarios)
})

io.of("/").on("connection", (socket) => {
  cadastro(socket, io)
  registrarEventosLogin(socket, io)
});
