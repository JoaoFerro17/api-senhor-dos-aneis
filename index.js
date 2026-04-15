const express =  require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const db = require('./database');

app.get('/api/personagens', (req, res) => {
    let { raca, ordem, limite = 10, pagina = 1 } = req.query;
    
    limite = parseInt(limite);
    const offset = (parseInt(pagina) - 1) * limite;

    let sql = "SELECT * FROM personagens WHERE 1=1";
    let params = [];

    if (raca) {
        sql += " AND raca LIKE ?";
        params.push(`%${raca}%`);
    }

    if (ordem && ordem.toLowerCase() === 'desc') {
        sql += " ORDER BY nome DESC";
    } else {
        sql += " ORDER BY nome ASC";
    }

    sql += " LIMIT ? OFFSET ?";
    params.push(limite, offset);

    db.all(sql, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao consultar o reino: " + err.message });
        }
        
        res.json({
            pagina_atual: parseInt(pagina),
            limite_por_pagina: limite,
            dados: rows
        });
    });
});

app.post('/api/personagens', (req, res) => {
    const { nome, raca, classe, localizacao } = req.body;

    if (!nome || !raca || !classe) {
        return res.status(400).json({ 
            erro: "Campos obrigatórios: nome, raca e classe." 
        });
    }

    if (nome.length < 3) {
        return res.status(400).json({ 
            erro: "O nome deve ter pelo menos 3 caracteres." 
        });
    }

    const sql = `INSERT INTO personagens (nome, raca, classe, localizacao) VALUES (?, ?, ?, ?)`;
    
    const valores = [nome, raca, classe, localizacao || 'Terra-Média'];

    db.run(sql, valores, function(err) {
        if (err) {
            return res.status(500).json({ 
                erro: "Erro ao inserir no banco: " + err.message 
            });
        }
        res.status(201).json({
            id: this.lastID,
            nome,
            raca,
            classe,
            localizacao: localizacao || 'Terra-Média'
        });
    });
});

app.put('/api/personagens/:id', (req, res) => {
    const id = req.params.id;
    const { nome, raca, classe, localizacao } = req.body;

    if (!nome || !raca || !classe) {
        return res.status(400).json({ erro: "Campos obrigatórios: nome, raca e classe." });
    }

    const sql = `UPDATE personagens SET nome = ?, raca = ?, classe = ?, localizacao = ? WHERE id = ?`;
    const valores = [nome, raca, classe, localizacao || 'Terra-Média', id];

    db.run(sql, valores, function(err) {
        if (err) {
            return res.status(500).json({ erro: "Erro ao atualizar: " + err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({ erro: "Personagem não encontrado para atualização." });
        }

        res.json({ id, nome, raca, classe, localizacao });
    });
});

app.delete('/api/personagens/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM personagens WHERE id = ?`;

    db.run(sql, [id], function(err) {
        if (err) {
            return res.status(500).json({ erro: "Erro ao deletar: " + err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({ erro: "Personagem não encontrado para remoção." });
        }
        res.status(204).send();
    });
});
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📜 Documentação da API disponível no README.md`);
});