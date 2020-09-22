const axios = require('axios');
const moment = require('moment');
const connection = require('../infrastructure/database/connection');
const repository = require('../repositories/atendimento');

class Atendimento {
    constructor() {
        this.validDate = ({date, creationDate}) => {
            moment(date).isSameOrAfter(creationDate);
        } 

        this.validClientName = size => size >= 5;
          
        this.validate = params => {
            this.validations.filter(field => {
                const { name } = field;
                const param = params[name];

                return !field.valid(param);
            });
        }

        this.validations = [
            {
                name: 'data',
                valid: this.validDate,
                message: 'Data deve ser maior ou igual a data atual.'
            },
            {
                name: 'cliente',
                valid: this.validClientName,
                message: 'Nome do cliente deve ter no mínimo 5 caracteres.'
            }
        ];
    }

    add(atendimento) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        
        const params = {
            data: { date, creationDate },
            cliente: { size: atendimento.cliente.length }
        }

        const errors = this.validate(params);
        
        if(errors.length > 0) 
            return new Promise((resolve, reject) => {
                reject(errors);
            });
        
        const atendimentoDatado = { ...atendimento, dataCriacao, data };

        return repository.add(atendimentoDatado).then((results) => {
            atendimento.id = results.insertId;
            return atendimento;
        });
    }

    list() {
        return repository.list();
    }

    searchById(id) {
        return repository.searchById(id).then(async result => {
            const atendimento = result[0];
            const cpf = atendimento.cliente;

            const { data } = await axios.get(`http://localhost:8082/${cpf}`);
            atendimento.cliente = data;

            return atendimento;
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