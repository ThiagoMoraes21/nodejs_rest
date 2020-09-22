const query = require('../infrastructure/database/queries');

class Pets {
    add(newPet) {
        const sql = `INSERT INTO Pets SET ?`;
        return query(sql, newPet);
    }
}

module.exports = new Pets();