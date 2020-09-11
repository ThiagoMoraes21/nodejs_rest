const connection = require('../infrastructure/connection');

class Atendimento {
    add(atendimento) {
        const sql = `INSERT INTO Atendimentos SET ?`;

        connection.query(sql, atendimento, (err, results) => {
            if(err)
                console.log('Err: ', err);

            console.log('Results: ', results);
        });
    }
}

module.exports = new Atendimento;