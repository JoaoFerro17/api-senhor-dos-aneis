# API da Terra-Média - O Senhor dos Anéis  
**Projeto:** Trabalho 1 - Implementação de Endpoints e Validações  

---

##  1. Lista de Todos os Endpoints
A API permite gerenciar os integrantes da Sociedade do Anel e outros personagens da franquia.

| Funcionalidade | Método | URL | Descrição |
| :--- | :--- | :--- | :--- |
| **Boas-vindas** | `GET` | `/` | Retorna uma mensagem inicial da API. |
| **Listar/Filtrar** | `GET` | `/api/personagens` | Lista todos os personagens ou filtra por raça. |
| **Criar Novo** | `POST` | `/api/personagens` | Adiciona um novo personagem com validações. |
| **Atualizar** | `PUT` | `/api/personagens/:id` | Atualiza os dados de um personagem existente. |
| **Remover** | `DELETE` | `/api/personagens/:id` | Remove um personagem permanentemente. |

##  2. Detalhamento dos Endpoints

###  GET `/`
* **Método:** `GET`
* **URL:** `http://localhost:3000/`
* **Resposta (200 OK):**
```text
Bem-vindo à API de Personagens da Terra Média!
```
![boas-vindas](./imagens/teste_boas_vindas.png)

###  GET `/`
* **Método:** `GET`
* **URL:** `http://localhost:3000/api/personagens`
* **Resposta (200 OK):**
```text
[
  { "id": 1, "nome": "Frodo Bolseiro", "raca": "Hobbit", "classe": "Portador do Anel", "localizacao": "Condado" },
  { "id": 2, "nome": "Gandalf", "raca": "Mago", "classe": "Istari", "localizacao": "Variável" },
  { "id": 3, "nome": "Aragorn", "raca": "Humano", "classe": "Guradião", "localizacao": "Valfenda" },
  { "id": 4, "nome": "Legolas", "raca": "Elfo", "classe": "Arqueiro", "localizacao": "Floresta de Fangorn" },
  {id: 5, nome: "Gimli", raca: "Anão", classe: "Guerreiro", localizacao: "Moria"}
]
```
![listagem todos os  personagens](./imagens/listagem_geral.png)

###  POST `/api/personagens`
* **Método:** `POST`
* **URL:** `http://localhost:3000/api/personagens`
* **Corpo da Requisição (Body JSON):**
```json
{
  "nome": "Boromir",
  "raca": "Humano",
  "classe": "Guerreiro",
  "localizacao": "Gondor"
}
```
* **Resposta (201 Created):**
```json
{
  "id": 6,
  "nome": "Boromir",
  "raca": "Humano",
  "classe": "Guerreiro",
  "localizacao": "Gondor"
}
```
![boromir](./imagens/id_6.png)

###  POST `/api/personagens`
* **Método:** `POST`
* **URL:** `http://localhost:3000/api/personagens`
* **Corpo da Requisição (Body JSON):**
```json
{
  "nome": "Galadriel",
  "raca": "Elfo",
  "classe": "Rainha",
  "localizacao": "Lothlórien"
}
```
* **Resposta (201 Created):**
```json
{
  "id": 7,
  "nome": "Galadriel",
  "raca": "Elfo",
  "classe": "Rainha",
  "localizacao": "Lothlórien"
}
```
![Galadriel](./imagens/id_7.png)

###  POST `/api/personagens`
* **Método:** `POST`
* **URL:** `http://localhost:3000/api/personagens`
* **Corpo da Requisição (Body JSON):**
```json
{
  "nome": "Saruman",
  "raca": "Istari",
  "classe": "Mago",
  "localizacao": "dois palmos debaixo da terra"
}
```
* **Resposta (201 Created):**
```json
{
  "id": 8,
  "nome": "Saruman",
  "raca": "Istari",
  "classe": "Mago",
  "localizacao": "dois palmos debaixo da terra"
}
```
![Saruman](./imagens/id_8.png)

###  POST `/api/personagens`
* **Método:** `POST`
* **URL:** `http://localhost:3000/api/personagens`
* **Corpo da Requisição (Body JSON):**
```json
{
  "nome": "Gollum",
  "raca": "Hobbit",
  "classe": "?????",
  "localizacao": "🔥🔥🔥🔥🔥"
}
```
* **Resposta (201 Created):**
```json
{
  "id": 9,
  "nome": "Gollum",
  "raca": "Hobbit",
  "classe": "?????",
  "localizacao": "🔥🔥🔥🔥🔥"
}
```
![Gollum](./imagens/id_9.png)

###  POST `/api/personagens`
* **Método:** `POST`
* **URL:** `http://localhost:3000/api/personagens`
* **Corpo da Requisição (Body JSON):**
```text
{
  "nome": "Sam",
  "raca": "Hobbit",
  "classe": "Pai de familia",
  "localizacao": "Condado"
}
```
* **Resposta (201 Created):**
```json
{
  "id": 10,
  "nome": "Sam",
  "raca": "Hobbit",
  "classe": "Pai de familia",
  "localizacao": "Condado"
}
```
![Sam](./imagens/id_10.png)

### Filtro por Raça
![filtro por raça](./imagens/filtro_por_raca.png)

### PUT `/api/personagens/:id`
* **Método:** `PUT`
* **URL:** `http://localhost:3000/api/personagens/:id`
* * **Resposta (200 OK):** Objeto atualizado.
```json
{
  "id": 10,
  "nome": "Sam",
  "raca": "Hobbit",
  "classe": "Pai de familia",
  "localizacao": "Condado"
}
```
* **Exemplo:**
* ![alteração do personagem no id 1](./imagens/put_01.png)
* * ![alteração do personagem no id 1](./imagens/put_02.png)

### DELETE `/api/personagens/:id`
* **Método:** `DELETE`
* **URL:** `http://localhost:3000/api/personagens/:id`
* **Resposta (204 No Content):** Sucesso sem corpo na resposta.
* **Erro (404 Not Found):** Caso o ID informado não exista.
* **Exemplo:**
* ![delete do personagem](./imagens/delete_01.png)
* ![delete do personagem](./imagens/delete_02.png)

## 3. Explicação de Validações Implementadas
Para garantir a integridade dos dados da Terra-Média, as seguintes regras foram aplicadas tanto no **POST** quanto no **PUT**:

1. **Campos Obrigatórios:** O servidor valida se `nome`, `raca` e `classe` estão presentes. Caso falte algum, retorna **Status 400 (Bad Request)**.
2. **Consistência do Nome:** O campo `nome` deve possuir no mínimo **3 caracteres**. Nomes menores são rejeitados para evitar registros inválidos.
3. **Localização Padrão (Default):** Caso a `localizacao` não seja informada, a API define automaticamente como **"Terra-Média"**.
4. **Gerenciamento de IDs:** O servidor controla a geração de IDs únicos de forma incremental, impedindo conflitos.
5. **Verificação de Existência:** Nos métodos **PUT** e **DELETE**, a API verifica se o ID existe antes de processar. Caso não encontre, retorna **Status 404 (Not Found)**.

## ⚙️ Como Rodar o Projeto
1. Clone este repositório.
2. No terminal, execute `npm install` para baixar as dependências.
3. Inicie o servidor com `npm run dev`.
4. A API estará disponível em: `http://localhost:3000`
