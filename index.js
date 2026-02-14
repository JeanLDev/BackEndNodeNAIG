// Incluir as bibliotecas
// Gerencia as requisições, rotas e URLs, entre outra funcionalidades
const express = require("express");
// Chamar a função express
const app = express();
const Frase = process.env.FRASE

// Criar as rotas
app.get("/", function(req, res){
    res.send("Gerenciador Financeiro NOVO");
});
app.get("/frase", function(req, res){
    res.send({Frase: Frase});
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
PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});