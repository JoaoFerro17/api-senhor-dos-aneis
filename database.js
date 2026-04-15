const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./terra_media.db', (err) => {
    if (err) console.error('Erro ao abrir o banco:', err.message);
    else console.log('✅ Conectado ao banco de Dados SQLite!');
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS personagens (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        raca TEXT NOT NULL,
        classe TEXT NOT NULL,
        localizacao TEXT DEFAULT 'Terra-Média'
    )`);


    db.get("SELECT COUNT(*) as total FROM personagens", (err, row) => {
        if (row.total === 0) {
            console.log("🌱 Populando banco de dados inicial...");
            const stmt = db.prepare("INSERT INTO personagens (nome, raca, classe, localizacao) VALUES (?, ?, ?, ?)");
            
            const iniciais = [
                ["Frodo Bolseiro", "Hobbit", "Portador", "Condado"],
                ["Gandalf", "Mago", "Istari", "Variável"],
                ["Aragorn", "Humano", "Guardião", "Valfenda"],
                ["Legolas", "Elfo", "Arqueiro", "Floresta das Trevas"],
                ["Gimli", "Anão", "Guerreiro", "Moria"],
                ["Samwise Gamgee", "Hobbit", "Jardineiro", "Condado"],
                ["Boromir", "Humano", "Guerreiro", "Gondor"],
                ["Galadriel", "Elfo", "Rainha", "Lothlórien"],
                ["Saruman", "Istari", "Mago", "Isengard"],
                ["Gollum", "Hobbit", "Criatura", "Cavernas"],
                ["Sauron", "Maia", "Lorde das Trevas", "Mordor"],
                ["Éowyn", "Humano", "Escudeira", "Rohan"],
                ["Faramir", "Humano", "Capitão", "Gondor"],
                ["Elrond", "Meio-Elfo", "Lorde", "Valfenda"],
                ["Arwen", "Elfo", "Princesa", "Valfenda"],
                ["Merry", "Hobbit", "Soldado", "Condado"],
                ["Pippin", "Hobbit", "Soldado", "Condado"],
                ["Théoden", "Humano", "Rei", "Rohan"],
                ["Bilbo Bolseiro", "Hobbit", "Aventureiro", "Condado"],
                ["Gríma", "Humano", "Conselheiro", "Rohan"]
            ];

            iniciais.forEach(p => stmt.run(p));
            stmt.finalize();
        }
    });
});

module.exports = db;