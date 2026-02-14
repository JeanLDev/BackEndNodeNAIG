// Incluir as bibliotecas
// Gerencia as requisições, rotas e URLs, entre outra funcionalidades

require('dotenv').config();
const express = require("express");
const cors = require("cors");
const webPush = require("web-push");
const { createClient } = require("@supabase/supabase-js");

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

// Chamar a função express
const app = express();

// Criar as rotas
app.get("/", function(req, res){
    res.send("Gerenciador Financeiro");
});
app.get("/keys", function(req, res){
    res.send(VAPID_PUBLIC_KEY);
    res.send(VAPID_PRIVATE_KEY);
    res.send(SUPABASE_URL);
    res.send(SUPABASE_SERVICE_KEY);
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