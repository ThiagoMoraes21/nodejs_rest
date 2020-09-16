class Tabelas {
    init(connection) {
        this.connection = connection;
        this.createAtendimentos(); 
        this.createPets();
    }

    createAtendimentos() {
        const sql = `
            CREATE TABLE IF NOT EXISTS Atendimentos (
                id int NOT NULL AUTO_INCREMENT,
                cliente varchar(11) NOT NULL,
                pet varchar(20),
                servico varchar(20) NOT NULL,
                data datetime NOT NULL,
                dataCriacao datetime NOT NULL,
                status varchar(20) NOT NULL,
                observacoes text,
                PRIMARY KEY(id)
            )`;

        this.connection.query(sql, err => {
            if(err)
                console.log('Error trying to create table Atendimentos: ', err);

            console.log('Table Atendimentos was created successfuly.');
        });
    }

    createPets() {
        const query = `
            CREATE TABLE IF NOT EXISTS Pets (
                id int NOT NULL AUTO_INCREMENT,
                nome varchar(50),
                imagem varchar(200),
                PRIMARY KEY (id)
            )
        `;

        this.connection.query(query, error => {
            if(error) 
                console.log('Error trying to create table Pets');

            console.log('Table Pets was created successfuly.')
        });
    }
}

module.exports = new Tabelas;