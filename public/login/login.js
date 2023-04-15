import { emitirAutenticarUsuario } from "./socket-front-login.js"

const form = document.getElementById("form-login")

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = form["input-usuario"].value //acessando o input dentro um formulario 
    const senha = form["input-senha"].value

    emitirAutenticarUsuario({nome, senha})
})