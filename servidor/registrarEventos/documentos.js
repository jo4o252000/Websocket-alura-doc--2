import {
    atualizaDocumento,
    encontrarDocumento,
    excluirDocumento,
} from "../db/documentosDb.js";
import {adicionarConexao, obterUsuariosDocumentos, removerConexao, encontrarConexao} from "../utils/conexoesDocumentos.js";

function registrarEventosDocumentos(socket, io){
  socket.on("selecionar_documento", async ({nomeDocumento, nomeUsuario}, devolverTexto) => {
    const documento = await encontrarDocumento(nomeDocumento);

    if (documento) {
      const conexaoEncontrada = encontrarConexao(nomeDocumento, nomeUsuario)
      if(!conexaoEncontrada){
        socket.join(nomeDocumento);

        adicionarConexao({nomeDocumento, nomeUsuario})

        socket.data = {
          usuarioEntrou: true,
        }

        const usuariosNoDocumento = obterUsuariosDocumentos(nomeDocumento)

        io.to(nomeDocumento).emit("usuarios_no_documento", usuariosNoDocumento) //eviando para todos que estão no documento incluindo para o cliente que está conectado

        console.log(usuariosNoDocumento)

        devolverTexto(documento.texto);
      }else{
        socket.emit("usuario_ja_no_documento")
      }
    }
      
    socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
      const atualizacao = await atualizaDocumento(nomeDocumento, texto);
  
      if (atualizacao.modifiedCount) {
        socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
      }
    });
  
    socket.on("excluir_documento", async (nome) => {
      const resultado = await excluirDocumento(nome);
  
      if (resultado.deletedCount) {
        io.emit("excluir_documento_sucesso", nome);
      }
    });
    //resgistrando o disconect para somente o usuarios que emeitiram o evento de "selecionar documento"
    socket.on("disconnect", () => {
      if(socket.data.usuarioEntrou){
        removerConexao(nomeDocumento, nomeUsuario)

        const usuariosNoDocumento = obterUsuariosDocumentos(nomeDocumento)

        io.to(nomeDocumento).emit("usuarios_no_documento", usuariosNoDocumento)
      }
    })
  });
}

export default registrarEventosDocumentos;