import { emitirCadastrarUsuario } from "./socket-front-cadastro.js"

const form = document.getElementById("form-cadastro")

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const usuario = form["input-usuario"].value //acessando o input dentro um formulario 
    const senha = form["input-senha"].value

    emitirCadastrarUsuario({usuario, senha})
})