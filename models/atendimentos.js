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

            res.status(201).json({ results });
        });
    }
}

module.exports = new Atendimento;