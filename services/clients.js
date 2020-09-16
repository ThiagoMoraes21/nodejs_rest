const express = require('express');
const bodyparser = require('body-parser');

const app = new express();
const faker = require('faker');

const PORT = process.env.PORT || 8082;

app.use(bodyparser.json());

app.get('/:cpf', (req, res) => {
    const { cpf } = req.params;

    res.status(200).json({
        cpf,
        nome: faker.name.findName(),
        dataDeNascimento: faker.date.past()
    });
});

app.listen(PORT, () => {
    console.log(`Client api is running at port: ${PORT}`);
});