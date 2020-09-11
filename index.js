const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
});

app.get('/atendimentos', (req, res) => {
    res.send('Você está na rota de atendimentos.');
});