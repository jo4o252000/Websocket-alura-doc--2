import jwt from 'jsonwebtoken'

function autorizarUsuario(socket, next){
    const tokenJwt = socket.handshake.auth.token //recebendo o token que está send passado no arquivo socket-front-index.js
    try{
        const payloadToken = jwt.verify(tokenJwt, process.env.SEGREDO_JWT) //vai validar o token (caso o token não seja valido vai lançar um erro )

        socket.emit("autorizacao_sucesso", payloadToken)
        next()
    }catch (erro){
        next(erro)
    }
}

export default autorizarUsuario