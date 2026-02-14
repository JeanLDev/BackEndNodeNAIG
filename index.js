// Incluir as bibliotecas
// Gerencia as requisições, rotas e URLs, entre outra funcionalidades
const express = require("express");
// Chamar a função express
const app = express();

// Criar as rotas
app.get("/", function(req, res){
    res.send("Gerenciador Financeiro");
});

app.get("/sobre-empresa", function(req, res){
    res.send("Pagina sobre empresa");
});

app.get("/blog", function(req, res){
    res.send("Pagina do blog");
});

app.get("/contato", function(req, res){
    res.send("Pagina de contato");
});

// Iniciar o servidor na porta 8080
app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});