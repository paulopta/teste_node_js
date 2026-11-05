const express = require("express");
const cors = require('cors');
const path = require('path'); // <-- Importe o path nativo do Node

const app = express();

app.use(cors());
app.use(express.json());

// --- ADICIONE ESTA LINHA ABAIXO ---
// Diz ao Express para servir todos os arquivos da pasta 'public' automaticamente na raiz (/)
app.use(express.static(path.join(__dirname, 'public')));

let usuarios = [
    { id: 1, nome: "João" },
    { id: 2, nome: "Maria" }
];

// Suas rotas da API continuam iguais...
app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

app.get("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find((u) => u.id === id);
  if (!usuario) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }
  res.json(usuario);
});

app.post("/usuarios", (req, res) => {
  const novoUsuario = {
    id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
    nome: req.body.nome,
  };
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

app.put("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find((u) => u.id === id);
  if (!usuario) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }
  usuario.nome = req.body.nome;
  res.json(usuario);
});

app.delete("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex((u) => u.id === id);
  if (index === -1) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }
  usuarios.splice(index, 1);
  res.json({ mensagem: "Usuário removido" });
});

// Nota: O express.static já lida com a rota raiz '/', 
// mas você pode manter ou remover o app.get('/') antigo se preferir que o index.html seja prioridade.

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});