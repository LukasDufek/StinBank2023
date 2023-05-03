const https = require('https');
const fs = require('fs');

const DownloadFile = {}



DownloadFile.downloadTextFromUrl = (url) => {
    let filename = 'server/file.txt'
    let htmlTagsRegex = /<\/?[a-z][\s\S]*>/i;
    https.get(url,  (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });


        response.on('end',  () => {
            fs.writeFile(filename, data, (err) => {
                if (htmlTagsRegex.test(data)) {
                    console.log('error');
                    return 'error';
                }
                console.log(`File downloaded and saved as ${filename}`);
            });
        });
    }).on('error', (err) => {
        console.log(`Error: ${err.message}`);
    });



}

module.exports = DownloadFile;
