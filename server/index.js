const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

//odkaz na meny: https://www.cnb.cz/cs/financni_trhy/devizovy_trh/kurzy_devizoveho_trhu/denni_kurz.txt
//testovani celeho projektu  npx jest --coverage

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

/*
try {
    const file = fs.createWriteStream("server/file.txt");
    const request = https.get("https://www.cnb.cz/cs/financni_trhy/devizovy_trh/kurzy_devizoveho_trhu/denni_kurz.txt", function (response) {
        response.pipe(file);


        //console.log(fs.statSync("file.txt").isFile());
        //console.log(fs.statSync("server/file.txt").isFile());
        //console.log(fs.statSync("file.txt").size);
        //console.log(fs.statSync("server/file.txt").size);




        // after download completed close filestream
        file.on("finish", () => {
            file.close();
            console.log("Download Completed");
        });
    });
}catch(err) {
    console.log(err);

}

 */



function downloadTextFromUrl() {
    let url = "https://www.cnb.cz/cs/financni_trhy/devizovy_trh/kurzy_devizoveho_trhu/denni_kurz.txt";
    let filename = 'server/file.txt'
    let htmlTagsRegex = /<\/?[a-z][\s\S]*>/i;
    https.get(url, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });


        response.on('end', () => {
            fs.writeFile(filename, data, (err) => {
                if (htmlTagsRegex.test(data))
                {
                    console.log('error');
                    return 'error';
                }
                if (err) throw err;
                console.log(`File downloaded and saved as ${filename}`);
            });
        });
    }).on('error', (err) => {
        console.log(`Error: ${err.message}`);
    });
}



downloadTextFromUrl();

const data = fs.readFileSync('server/clients.json', 'utf8');
let validate_data = JSON.parse(data);
console.log(validate_data[0].accounts[0].account_number);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
