const https = require('https');
const fs = require('fs');

const DownloadFile = {}



DownloadFile.downloadTextFromUrl = () => {
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


/*
DownloadFile.downloadTextFromUrl2 = () =>{

    const url = "https://www.cnb.cz/cs/financni_trhy/devizovy_trh/kurzy_devizoveho_trhu/denni_kurz.txt";
    const filename = 'server/file.txt';
    const file = fs.createWriteStream(filename);
    https.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
            file.close();
            console.log(`File downloaded and saved as ${filename}`);
        });
    }).on('error', function(error) {
        fs.unlink(filename);
        console.error(error);
    });
}
*/
module.exports = DownloadFile;
