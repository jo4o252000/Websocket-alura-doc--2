import criarHashESalSenha from "../utils/criarHashESalSenha.js";
import { usuariosColecao } from "./dbConnect.js";

function cadastrarUsuario({usuario, senha}){
    const {hashSenha, salSenha} = criarHashESalSenha(senha)
    return usuariosColecao.insertOne({ nome: usuario, hashSenha, salSenha }) //inserindo o cadastro no banco
}
function encontrarUsuario(nome){
    return usuariosColecao.findOne({nome})
}

export {cadastrarUsuario, encontrarUsuario};