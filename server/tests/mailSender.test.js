
const mailSender = require('../scripts/mailSender');
//const nodemailer = require('nodemailer');
//const localStorage = require('localStorage');

    describe('generateRandomFourDigitNumber', () => {
        it('should generate a random four-digit number', () => {
            const randomNum = mailSender.generateRandomFourDigitNumber();
            expect(randomNum).toMatch(/^\d{4}$/);
        });
    });
