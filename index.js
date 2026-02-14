// Incluir as bibliotecas
// Gerencia as requisições, rotas e URLs, entre outra funcionalidades
require('dotenv').config();

const express = require("express");
const webPush = require("web-push");
const { createClient } = require("@supabase/supabase-js");
const cors = require("cors");



const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
  throw new Error("Chaves VAPID não configuradas");
}

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  throw new Error("Supabase não configurado");
}

/* =========================
   CONFIG PUSH
========================= */

webPush.setVapidDetails(
  "mailto:jeanldev@hotmail.com",
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

/* =========================
   SUPABASE
========================= */

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_KEY
);

// Chamar a função express
const app = express();

app.use(express.json());
app.use(cors({ origin: "https://naig.online" }));
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

/* =========================
   ENVIAR PUSH
========================= */

app.post("/send-to-user", async (req, res) => {
  const { user_id, title, body } = req.body;

  if (!user_id || !title || !body) {
    return res.status(400).json({
      error: "user_id, title e body são obrigatórios"
    });
  }

  try {
    const { data, error } = await supabase
      .from("clinica_subscriptions")
      .select("subscription")
      .eq("user_id", user_id);


    if (error) throw error;

    console.log(data)

    if (!data || data.length === 0) {
      return res.status(404).json({
        error: "Nenhuma subscription encontrada"
      });
    }

    const payload = JSON.stringify({ title, body });

    const results = await Promise.allSettled(
      data.map(sub =>
        webPush.sendNotification(sub.subscription, payload)
      )
    );

    console.log("Resultado envio:", results);

    res.json({
      success: true,
      enviados: results.length
    });

  } catch (err) {
    console.error("Erro envio push:", err);
    res.status(500).json({ error: err.message });
  }
});

// Iniciar o servidor na porta 8080
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
