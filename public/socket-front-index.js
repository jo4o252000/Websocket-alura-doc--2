import { inserirLinkDocumento, removerLinkDocumento } from "./index.js";
import { obterCookie } from "./utils/cookies.js";

const socket = io("/usuarios",{ // "/usuarios" está sinalizando o nameSpace que o usuario está tentando conectar
  auth: {
    /*eviando o token para o back-end. POR QUE NÃO USAR O SOCKET.EMIT? a funçoes middlewares são executadas muito antes de estabelecer a conexão com o servidor 
    por isso passamos os token para o back-end dessa forma  */
    token:obterCookie("tokenJwt")
  }
});

socket.on("connect_error", (erro) => {
  alert(erro)
  window.location.href = "/login/index.html"
})

socket.emit("obter_documentos", (documentos) => {
  documentos.forEach((documento) => {
    inserirLinkDocumento(documento.nome);
  });
});

function emitirAdicionarDocumento(nome) {
  socket.emit("adicionar_documento", nome);
}

socket.on("adicionar_documento_interface", (nome) => {
  inserirLinkDocumento(nome);
});

socket.on("documento_existente", (nome) => {
  alert(`O documento ${nome} já existe!`);
});

socket.on("excluir_documento_sucesso", (nome) => {
  removerLinkDocumento(nome);
});

export { emitirAdicionarDocumento };
