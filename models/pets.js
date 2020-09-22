const connection = require('../infrastructure/database/connection');
const filesUpdload = require('../infrastructure/files/filesUpdload');
const repository = require('../repositories/pets');

class Pets {
    add(pet) {
        return new Promise((resolve, reject) => {
            filesUpdload(pet.imagem, pet.nome, (errUpload, newPath) => {
                if(errUpload)
                   return  reject({ error: errUpload });
    
                const newPet = { nome: pet.nome, imagem: newPath }
    
                return repository.add([newPet]).then(result => {
                    resolve({ newPet }); 
                });
            });
        })

    }
}

module.exports = new Pets;