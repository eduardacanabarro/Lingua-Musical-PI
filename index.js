const express = require("express");
const fs = require("fs");
const cors = require("cors");

const server = express();
server.use(express.json());
server.use(cors());

const dados = require("./data/usuario.json");

server.listen(3000, () => {
    console.log("O servidor está funcional.");
});

server.get('/', (req, res) => {
    return res.json({ mensagem: "Estou funcionando!" });
});

// CREATE DA API
server.post('/usuario', (req, res) => {
    const { nome, email, senha } = req.body;
    
    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" });
    } else {
        const novoUsuario = {
            id: dados.Usuarios.length + 1,
            nome: nome,
            email: email,
            senha: senha
        };

        dados.Usuarios.push(novoUsuario);
        salvarDados();

        return res.status(201).json({ mensagem: "Dados completos, cadastro feito com sucesso" });
    }
});

// READ DA API
server.get('/usuario', (req, res) => {
    return res.json(dados.Usuarios);
});

// UPDATE DA API
server.put('/usuario/:id', (req, res) =>{
    const usuarioId = parseInt(req.params.id)
    const atualizarUser = req.body

    const indiceUsuario = dados.Usuarios.findIndex( u => u.id === usuarioId)

    if(indiceUsuario === -1){
        return res.status(404).json({mensagem:"Usuário não encontrado"})
    } else {
        dados.Usuarios[indiceUsuario].nome = atualizarUser.nome || dados.Usuarios[indiceUsuario].nome
        dados.Usuarios[indiceUsuario].email = atualizarUser.email || dados.Usuarios[indiceUsuario].email
        dados.Usuarios[indiceUsuario].senha = atualizarUser.senha || dados.Usuarios[indiceUsuario].senha

        salvarDados(dados)

        return res.status(201).json({mensagem:"Dados completos, atualização feita com sucesso!"})
    }
})

// DELETE DA API
server.delete('/usuario/:id', (req,res) => {
    const id = parseInt(req.params.id)

    dados.Usuarios = dados.Usuarios.filter(u => u.id !== id)
    salvarDados(dados)
    
    return res.status(200).json({mensagem:"Usuário excluido"})
})

// Função que salva os dadoporra
function salvarDados(){
    fs.writeFileSync(__dirname + '/data/usuario.json', JSON.stringify(dados, null, 2))
}