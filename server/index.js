const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//odkaz na meny: https://www.cnb.cz/cs/financni_trhy/devizovy_trh/kurzy_devizoveho_trhu/denni_kurz.txt

const app = express();


const clients = require('./routes/api/client.routes');


app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(bodyParser.json());

app.use(cors());
app.use('/api/clients', clients);


mongoose
    .connect('mongodb+srv://lukasdufek:frameworkvuejs@clients0.m8fjmpg.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log(`Database connected successfully`)
    }).catch(err => {
    console.log(`Unable to connect with the database ${err}`)
});




const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
