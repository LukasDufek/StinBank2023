const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoConnection = require("./scripts/connection");
const downloadFile = require("./scripts/downloadFile");


//const mailSender = require('./mailSender');

//odkaz na meny: https://www.cnb.cz/cs/financni_trhy/devizovy_trh/kurzy_devizoveho_trhu/denni_kurz.txt
//testovani celeho projektu  npx jest --coverage

const app = express();


const clients = require('./routes/api/clientRoutes.js');

//const myMailSender = mailSender;


app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(bodyParser.json());

app.use(cors());
app.use('/api/clients', clients);

mongoConnection.connect_database();

downloadFile.downloadTextFromUrl();
//myMailSender.send_mail();


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
