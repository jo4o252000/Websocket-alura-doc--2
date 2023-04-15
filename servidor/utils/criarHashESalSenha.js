import {randomBytes, scryptSync} from "crypto" //modulo existento no node

function criarHashESalSenha(senhaDigitada){
    //criptografia de senha 
    const salSenha = randomBytes(16).toString("hex")
    const hashSenha = scryptSync(senhaDigitada, salSenha, 64).toString("hex")

    return{salSenha, hashSenha}
}

export default criarHashESalSenha;