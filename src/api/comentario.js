export default function adicionarComentario(comentario, usuario) {
    const novoComentario = {
        date: Date.now(),
        text: comentario,
        userName: usuario
    }
    return novoComentario
}
