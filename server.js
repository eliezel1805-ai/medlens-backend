const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// FUNÇÃO LGPD: Transforma e-mail/CPF em código secreto para proteger sua família
const anonimizar = (dado) => {
    return crypto.createHash('sha256').update(dado).digest('hex');
};

app.get('/', (req, res) => {
    res.send('🚀 Servidor MedLens IA Ativo - Maceió/AL');
});

// Rota de Cadastro Seguro
app.post('/api/usuarios', (req, res) => {
    const { email, consentimento } = req.body;
    if (!consentimento) return res.status(400).json({ erro: "Aceite a LGPD primeiro." });
    
    res.status(201).json({ 
        id_hash: anonimizar(email).substring(0, 12),
        status: "Ativo" 
    });
});

// Rota do Plano Social (Em Breve para Maceió)
app.post('/api/plano-social', (req, res) => {
    res.json({ mensagem: "Solicitação recebida. Analisaremos seu CadÚnico em breve!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
