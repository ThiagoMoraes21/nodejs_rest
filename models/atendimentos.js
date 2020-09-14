const moment = require('moment');
const connection = require('../infrastructure/connection');

class Atendimento {
    add(atendimento) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        const atendimentoDatado = { ...atendimento, dataCriacao, data };
        const sql = `INSERT INTO Atendimentos SET ?`;

        connection.query(sql, atendimentoDatado, (err, results) => {
            if(err)
                console.log('Err: ', err);

            console.log('Results: ', results);
        });
    }
}

module.exports = new Atendimento;