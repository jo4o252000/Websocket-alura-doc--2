import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv'

dotenv.config()

const cliente = new MongoClient( `mongodb+srv://${process.env.NAME_DB}:${process.env.SENHA_DB}@aluracluster.5xtmjdd.mongodb.net/?retryWrites=true&w=majority`)

let documentosColecao;
let usuariosColecao;

try {
  await cliente.connect();

  const db = cliente.db("alura-websockets");
  documentosColecao = db.collection("documentos");
  usuariosColecao = db.collection("usuario");

  console.log("Conectado ao banco de dados com sucesso!");
} catch (erro) {
  console.log(erro);
}

export { documentosColecao, usuariosColecao };
