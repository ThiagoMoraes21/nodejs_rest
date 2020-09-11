module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        res.send('Você está na rota de atendimentos.');
    });

    app.post('/atendimentos', (req, res) => {
        console.log('PAYLOAD: ', req.body);
        res.send('Você está na rota de atendimentos e está realizando um POST.');
    });
}