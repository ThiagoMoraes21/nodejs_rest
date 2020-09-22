const query = require('../infrastructure/database/queries');

class Atendimento {
    add(atendimento) {
        const sql = `INSERT INTO Atendimentos SET ?`;
        return query(sql, atendimento);
    }

    list() {
        const sql = `SELECT * FROM atendimentos`;
        return query(sql);
    }

    searchById(id) {
        const formatedId = parseInt(id);
        const sql = `SELECT * FROM atendimentos WHERE id=${formatedId}`;
        return query(sql);
    }
}

module.exports = new Atendimento();