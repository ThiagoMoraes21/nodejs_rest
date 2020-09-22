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

    update(values) {
        const sql = `UPDATE atendimentos SET ? WHERE id=?`;
        return query(sql, values);
    }

    delete(id) {
        const sql = `DELETE FROM atendimentos WHERE id=?`;
        return query(sql, id);
    }
}

module.exports = new Atendimento();