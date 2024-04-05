const express = require('express');
const app = express();
const port = 3000;
const { readFile } = require('fs').promises;

// Adicione esta linha para servir arquivos estáticos da pasta 'public'
app.use(express.static('../public'));

app.get('/', async (request, response) => {
    response.send( await readFile('../public/home.html', 'utf8') );
});

app.get('/clientes', async (request, response) => {
    response.send( await readFile('../public/clientes.html', 'utf8') );
});

app.get('/produtos', async (request, response) => {
    response.send( await readFile('../public/produtos.html', 'utf8') );
});

app.listen(process.env.PORT || port, () => console.log(`Disponivel em http://localhost:${port}`));