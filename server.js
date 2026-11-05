const express = require("express");
const cors = require('cors'); // <-- Importe o cors

const app = express();

// Ative o CORS para todas as origens
app.use(cors());

let usuarios = [
    { id:1, nome:"João" },
    { id:2, nome:"Maria" }
];

app.use(express.json());

//rota GET
app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

//rota GET por ID
app.get("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const usuario = usuarios.find((u) => u.id === id);
  if (!usuario) {
    return res.status(404).json({
      erro: "Usuário não encontrado",
    });
  }
  res.json(usuario);
});

//metódo POST
app.post("/usuarios", (req, res) => {
  const novoUsuario = {
    id: usuarios.length + 1,
    nome: req.body.nome,
  };

  usuarios.push(novoUsuario);

  res.status(201).json(novoUsuario);
});

app.put("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const usuario = usuarios.find((u) => u.id === id);

  if (!usuario) {
    return res.status(404).json({
      erro: "Usuário não encontrado",
    });
  }

  usuario.nome = req.body.nome;

  res.json(usuario);
});

app.delete("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = usuarios.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({
      erro: "Usuário não encontrado",
    });
  }

  usuarios.splice(index, 1);

  res.json({
    mensagem: "Usuário removido",
  });
});


app.get("/", (req, res) => {
  res.send("API funcionando!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});