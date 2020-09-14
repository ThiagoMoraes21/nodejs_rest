const moment = require('moment');
const connection = require('../infrastructure/connection');

class Atendimento {
    add(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        const atendimentoDatado = { ...atendimento, dataCriacao, data };
        const sql = `INSERT INTO Atendimentos SET ?`;

        connection.query(sql, atendimentoDatado, (error, results) => {
            if(error)
                return res.status(400).json({ error });

            res.status(201).json({ results });
        });
    }
}

module.exports = new Atendimento;