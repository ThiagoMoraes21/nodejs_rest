const customExpress = require('./config/customExpress');
const PORT = process.env.PORT || 3000;
const connection = require('./infrastructure/connection');
const Tabelas = require('./infrastructure/tables');

connection.connect((err) => {
    if (err)
        console.log('DB Connection Error: ', err);

    console.log('DB Connected successfuly.');
    
    Tabelas.init(connection);

    const app = customExpress();

    app.listen(PORT, () => {
        console.log(`Server is running at port: ${PORT}`);
    });
});

