const Pet = require('../models/pets');

module.exports = app => {
    app.post('/pet', (req, res) => {
        const pet = req.body;

        Pet.add(pet)
            .then(result => res.status(201).json(result))
            .catch(errors => res.status(400).json({ errors }));
    });
}

