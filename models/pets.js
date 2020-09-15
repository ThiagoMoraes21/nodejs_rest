const connection = require('../infrastructure/connection');

class Pets {
    add(pet, res) {
        const query = `INSERT INTO Pets SET ?`;

        connection.query(query, [pet], (error, response) => {
            if(error)
                return res.status(400).json({ error });

            res.status(201).json(pet);
        });
    }
}

module.exports = new Pets;