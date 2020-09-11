const customExpress = require('./config/customExpress');
const PORT = process.env.PORT || 3000;

const app = customExpress();

app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
});