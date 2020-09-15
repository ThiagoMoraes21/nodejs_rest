const moment = require('moment');
const connection = require('../infrastructure/connection');

class Atendimento {
    add(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        
        const validDate = moment(data).isSameOrAfter(dataCriacao);
        const validClientName = atendimento.cliente.length >= 5;

        const validations = [
            {
                name: 'data',
                valid: validDate,
                message: 'Data deve ser maior ou igual a data atual.'
            },
            {
                name: 'cliente',
                valid: validClientName,
                message: 'Nome do cliente deve ter no mínimo 5 caracteres.'
            }
        ];

        const errors = validations.filter(field => !field.valid);
        
        if(errors.length > 0) 
            return res.status(400).json({ errors });
        
        const atendimentoDatado = { ...atendimento, dataCriacao, data };
        const sql = `INSERT INTO Atendimentos SET ?`;

        connection.query(sql, atendimentoDatado, (error, results) => {
            if(error)
                return res.status(400).json({ error });

            res.status(201).json(atendimento);
        });
    }

    list(res) {
        const sql = `SELECT * FROM atendimentos`;

        connection.query(sql, (error, response) => {
            if(error)
                return res.status(500).json({ error });

            res.status(200).json(response);
        });
    }

    searchById(id, res) {
        const formatedId = parseInt(id);

        const sql = `SELECT * FROM atendimentos WHERE id=${formatedId}`;

        connection.query(sql, (error, response) => {
            if(error)
                return res.status(400).json({ error });

            const atendimento = response[0];
            res.status(200).json(atendimento);
        });
    }

    update(id, values, res) {
        const sql = `UPDATE atendimentos SET ? WHERE id=?`;
        const formatedId = parseInt(id);

        if(values.data)
            values.data = moment(values.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

        connection.query(sql, [values, formatedId], (error, response) => {
            if(error)
                return res.status(400).json({ error });

            res.status(200).json({ ...values, id: formatedId });
        });
    }

    delete(id, res) {
        const sql = `DELETE FROM atendimentos WHERE id=?`;
        const formatedId = parseInt(id);

        connection.query(sql, [formatedId], (error, response) => {
            if(error)
                return res.status(400).json({ error });

            res.status(200).json({ deleteId: formatedId });
        });
    }
}

module.exports = new Atendimento;