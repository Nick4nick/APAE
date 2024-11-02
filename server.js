const express = require('express');
const cors = require('cors'); 
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

app.use(cors()); 
app.use(express.json()); 

// Definição dos dados
let agendamentos = [
    { id: 1, titulo: 'Consulta Médica', data: '2023-10-30', descricao: 'Consulta com o Dr. Silva' },
];

let profissionais = [
    { id: 1, nome: 'Dr. Silva', cpf: '123.456.789-00', contato: '99999-9999', nascimento: '1980-01-01', usuario: 'dr.silva' },
];

let estudantes = [
    { id: 1, nome: 'João', cpf: '987.654.321-00', contato: '88888-8888', nascimento: '2005-05-05', usuario: 'joao' },
];

let usuarios = [
    { id: 1, nome: 'Maria' },
];

// Configuração do Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API da Apae',
            version: '1.0.0',
            description: 'Documentação da API de agendamentos da Apae',
        },
        servers: [
            {
                url: `http://localhost:${port}`
            }
        ],
    },
    apis: ['./server.js'], // Ajuste conforme suas rotas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rota raiz
app.get('/', (req, res) => {
    res.send('API está funcionando!');
});

// Endpoint para obter agendamentos
/**
 * @swagger
 * /api/agendamentos:
 *   get:
 *     summary: Retorna a lista de agendamentos
 *     responses:
 *       200:
 *         description: Lista de agendamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   titulo:
 *                     type: string
 *                   data:
 *                     type: string
 *                     format: date
 *                   descricao:
 *                     type: string
 */
app.get('/api/agendamentos', (req, res) => {
    res.json(agendamentos);
});

// Endpoint para obter profissionais
/**
 * @swagger
 * /api/profissionais:
 *   get:
 *     summary: Retorna a lista de profissionais
 *     responses:
 *       200:
 *         description: Lista de profissionais
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nome:
 *                     type: string
 *                   cpf:
 *                     type: string
 *                   contato:
 *                     type: string
 *                   nascimento:
 *                     type: string
 *                     format: date
 *                   usuario:
 *                     type: string
 */
app.get('/api/profissionais', (req, res) => {
    res.json(profissionais);
});

// Endpoint para adicionar um profissional
/**
 * @swagger
 * /api/profissionais:
 *   post:
 *     summary: Adiciona um novo profissional
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               cpf:
 *                 type: string
 *               contato:
 *                 type: string
 *               nascimento:
 *                 type: string
 *                 format: date
 *               usuario:
 *                 type: string
 *     responses:
 *       201:
 *         description: Profissional adicionado com sucesso
 */
app.post('/api/profissionais', (req, res) => {
    const { nome, cpf, contato, nascimento, usuario } = req.body;
    const newId = profissionais.length + 1;
    const newProfissional = { id: newId, nome, cpf, contato, nascimento, usuario };
    profissionais.push(newProfissional);
    res.status(201).json(newProfissional);
});

// Endpoint para alterar um profissional
/**
 * @swagger
 * /api/profissionais/{id}:
 *   put:
 *     summary: Altera um profissional existente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do profissional a ser alterado
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               cpf:
 *                 type: string
 *               contato:
 *                 type: string
 *               nascimento:
 *                 type: string
 *                 format: date
 *               usuario:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profissional alterado com sucesso
 */
app.put('/api/profissionais/:id', (req, res) => {
    const { id } = req.params;
    const { nome, cpf, contato, nascimento, usuario } = req.body;
    const profissional = profissionais.find(p => p.id == id);
    
    if (!profissional) {
        return res.status(404).json({ message: 'Profissional não encontrado' });
    }
    
    profissional.nome = nome;
    profissional.cpf = cpf;
    profissional.contato = contato;
    profissional.nascimento = nascimento;
    profissional.usuario = usuario;
    res.json(profissional);
});

// Endpoint para remover um profissional
/**
 * @swagger
 * /api/profissionais/{id}:
 *   delete:
 *     summary: Remove um profissional
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do profissional a ser removido
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Profissional removido com sucesso
 */
app.delete('/api/profissionais/:id', (req, res) => {
    const { id } = req.params;
    profissionais = profissionais.filter(p => p.id != id);
    res.status(204).send();
});

// Endpoint para obter estudantes
/**
 * @swagger
 * /api/estudantes:
 *   get:
 *     summary: Retorna a lista de estudantes
 *     responses:
 *       200:
 *         description: Lista de estudantes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nome:
 *                     type: string
 *                   cpf:
 *                     type: string
 *                   contato:
 *                     type: string
 *                   nascimento:
 *                     type: string
 *                     format: date
 *                   usuario:
 *                     type: string
 */
app.get('/api/estudantes', (req, res) => {
    res.json(estudantes);
});

// Endpoint para adicionar um estudante
/**
 * @swagger
 * /api/estudantes:
 *   post:
 *     summary: Adiciona um novo estudante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               cpf:
 *                 type: string
 *               contato:
 *                 type: string
 *               nascimento:
 *                 type: string
 *                 format: date
 *               usuario:
 *                 type: string
 *     responses:
 *       201:
 *         description: Estudante adicionado com sucesso
 */
app.post('/api/estudantes', (req, res) => {
    const { nome, cpf, contato, nascimento, usuario } = req.body;
    const newId = estudantes.length + 1;
    const newEstudante = { id: newId, nome, cpf, contato, nascimento, usuario };
    estudantes.push(newEstudante);
    res.status(201).json(newEstudante);
});

// Endpoint para alterar um estudante
/**
 * @swagger
 * /api/estudantes/{id}:
 *   put:
 *     summary: Altera um estudante existente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do estudante a ser alterado
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               cpf:
 *                 type: string
 *               contato:
 *                 type: string
 *               nascimento:
 *                 type: string
 *                 format: date
 *               usuario:
 *                 type: string
 *     responses:
 *       200:
 *         description: Estudante alterado com sucesso
 */
app.put('/api/estudantes/:id', (req, res) => {
    const { id } = req.params;
    const { nome, cpf, contato, nascimento, usuario } = req.body;
    const estudante = estudantes.find(e => e.id == id);
    
    if (!estudante) {
        return res.status(404).json({ message: 'Estudante não encontrado' });
    }
    
    estudante.nome = nome;
    estudante.cpf = cpf;
    estudante.contato = contato;
    estudante.nascimento = nascimento;
    estudante.usuario = usuario;
    res.json(estudante);
});

// Endpoint para remover um estudante
/**
 * @swagger
 * /api/estudantes/{id}:
 *   delete:
 *     summary: Remove um estudante
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do estudante a ser removido
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Estudante removido com sucesso
 */
app.delete('/api/estudantes/:id', (req, res) => {
    const { id } = req.params;
    estudantes = estudantes.filter(e => e.id != id);
    res.status(204).send();
});

// Endpoint para obter usuários
/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Retorna a lista de usuários
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nome:
 *                     type: string
 */
app.get('/api/usuarios', (req, res) => {
    res.json(usuarios);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
