const connection = require('../infrastructure/database/connection');
const filesUpdload = require('../infrastructure/files/filesUpdload');

class Pets {
    add(pet, res) {
        const query = `INSERT INTO Pets SET ?`;

        filesUpdload(pet.imagem, pet.nome, (errUpload, newPath) => {
            if(errUpload)
                return res.status(400).json({ error: errUpload})

            const newPet = { nome: pet.nome, imagem: newPath }

            connection.query(query, [newPet], (error, response) => {
                if(error)
                    return res.status(400).json({ error });
    
                res.status(201).json(newPet);
            });
        });

    }
}

module.exports = new Pets;