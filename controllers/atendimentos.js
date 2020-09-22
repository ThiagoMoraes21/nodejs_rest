const Atendimento = require('../models/atendimentos');

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.list()
            .then(results => res.status(200).json(results))
            .catch(errors =>  res.status(400).json({ errors }));
    });

    app.get('/atendimentos/:id', (req, res) => {
        const { id } = req.params;

        Atendimento.searchById(id)
            .then(result => res.status(200).json(result))
            .catch(error => res.status(500).json({ error }));
    });

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body;

        Atendimento.add(atendimento)
            .then(atendimentoCadastrado => res.status(201).json(atendimentoCadastrado))
            .catch(error => res.status(400).json({ error }));
    });

    app.patch('/atendimentos/:id', (req, res) => {
        const { id } = req.params;
        const values = req.body;

        Atendimento.update(id, values)
            .then(results => res.status(200).json(results))
            .catch(errors => res.status(400).json({ errors }));
    });

    app.delete('/atendimentos/:id', (req, res) => {
        const { id } = req.params;

        Atendimento.delete(id, res);
    });
}