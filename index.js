const express =  require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let personagens = [
    { id: 1, nome: "Frodo Bolseiro", raca: "Hobbit", classe: "Portador do Anel", localizacao: "Condado" },
    { id: 2, nome: "Gandalf", raca: "Mago", classe: "Istari", localizacao: "Variável" },
    { id: 3, nome: "Aragorn", raca: "Humano", classe: "Guardião", localizacao: "Valfenda" },
    { id: 4, nome: "Legolas", raca: "Elfo", classe: "Arqueiro", localizacao: "Floresta de Fangorn" },
    { id: 5, nome: "Gimli", raca: "Anão", classe: "Guerreiro", localizacao: "Moria" }
];

let proximoId = 6;

app.get('/', (req, res) => {
    res.send('Bem-vindo à API de Personagens da Terra Média!');
});

app.get('/api/personagens', (req, res) => {
    const{raca} = req.query;
    let resultado = personagens;
    if (raca) {
        resultado = resultado.filter(p => p.raca.toLowerCase() === raca.toLowerCase());
    }
    res.json(resultado);
});

app.post('/api/personagens', (req, res) => {
    const { nome, raca, classe, localizacao = "Terra-Média" } = req.body;
    if (!nome || !raca || !classe) {
        return res.status(400).json({ 
            erro: "Campos obrigatórios faltando.", 
            detalhes: "Envie nome, raca e classe." 
        });
    }
    if(nome.length < 3) {
        return res.status(400).json({ erro: "O nome é muito curto para ser lembrado nas canções." });
    }
    const novoPersonagem = {
        id: proximoId++,
        nome,
        raca,
        classe,
        localizacao
    };
    personagens.push(novoPersonagem);
    res.status(201).json(novoPersonagem);
});

app.put('/api/personagens/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const personagem = personagens.find(p => p.id === id);

    if (!personagem) {
        return res.status(404).json({ erro: "⚔️ Personagem não encontrado no reino." });
    }

    const { nome, raca, classe, localizacao } = req.body;

    if (!nome || !raca || !classe) {
        return res.status(400).json({ 
            erro: "Campos obrigatórios faltando.", 
            detalhes: "Envie nome, raca e classe para atualização completa." 
        });
    }

    if (nome.length < 3) {
        return res.status(400).json({ erro: "O nome é muito curto para os registrar." });
    }

    personagem.nome = nome;
    personagem.raca = raca;
    personagem.classe = classe;
    personagem.localizacao = localizacao || "Terra-Média";

    res.json(personagem);
});

app.delete('/api/personagens/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    const indice = personagens.findIndex(p => p.id === id);

    if (indice === -1) {
        return res.status(404).json({ erro: "⚔️ Impossível deletar: personagem não encontrado." });
    }

    personagens.splice(indice, 1);

    res.status(204).send();
});

app.listen(PORT, () => console.log(`🚀 Middle-earth API running on port ${PORT}`));