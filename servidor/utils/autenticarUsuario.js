import {scryptSync, timingSafeEqual} from 'crypto'

function autenticarUsuario(senha, usuario){
    //autenticando senha 
    const hashTeste = scryptSync(senha, usuario.salSenha, 64)

    const hashReal = Buffer.from(usuario.hashSenha, "hex")

    const autenticado = timingSafeEqual(hashTeste, hashReal)

    return autenticado
}
export default autenticarUsuario;