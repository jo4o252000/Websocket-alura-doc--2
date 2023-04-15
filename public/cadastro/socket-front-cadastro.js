
const socket = io()

function emitirCadastrarUsuario(dados){
    socket.emit("cadastrar_usuario", dados)
}

socket.on("cadastro_sucesso", () => {
    alert("Cadastro realizado com sucesso")
})
socket.on("cadastro_erro", () => {
    alert("Falha ao cadastrar o usuario")
})
socket.on("usuario_existente", () => {
    alert("Usuario já existe!")
})
export {emitirCadastrarUsuario}