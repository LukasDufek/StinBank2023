const request = require('supertest');
const https = require('https');
const fs = require('fs');
const DownloadFile = require('../scripts/downloadFile');
const PaymentsTools = require("../scripts/paymentsTools");
const assert = require("assert");


describe('DownloadFile', () => {

    it('should download text from URL and save it to file', (done) => {
        DownloadFile.downloadTextFromUrl("https://www.cnb.cz/cs/financni_trhy/devizovy_trh/kurzy_devizoveho_trhu/denni_kurz.txt");
        // wait for file to be downloaded
        setTimeout(() => {
            const fileContent = fs.readFileSync('server/file.txt', 'utf8');
            expect(fileContent).not.toContain('<'); // check if there are no HTML tags
            done();
        }, 7000); // wait for 5 seconds for file to download
    }, 10000);


    it('should not download HTML tags to file', (done) => {
        DownloadFile.downloadTextFromUrl("https://www.cnb.cz/cs/financni_trhy/devizovy_trh/kurzy_devizoveho_trhu/denni_kurz.txt");
        // wait for file to be downloaded
        setTimeout(() => {
            const fileContent = fs.readFileSync('server/file.txt', 'utf8');
            expect(fileContent).not.toMatch(/<\/?[a-z][\s\S]*>/i);
            done();
        }, 1000);
    });

});

