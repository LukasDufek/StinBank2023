//const nodemailer = require('nodemailer');
const email = require('emailjs-com');


const MailSender = {}




/*
// Odeslání emailu
MailSender.send_mail = () => {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        secure:false,
        port:465,
        auth: {
            user: 'stinmailsender@seznam.cz',  // Vaše emailová adresa
            pass: 'frameworkvuejs'             // Vaše heslo
        }
    });

    //const client = localStorage.getItem('client');
    //const client_mail = client.mail;

// Definování obsahu emailu
    let mailOptions = {
        from: 'stinmailsender@seznam.cz',
        to: 'lukas-dufek@email.cz',
        subject: 'StinBank - Potvrzovací kod',
        text: MailSender.generateRandomFourDigitNumber(),
    };

   try{
       transporter.sendMail(mailOptions);
   }catch (err){
       console.log(err);
   }
}
*/

MailSender.send_mail = (e) => {

    let code = MailSender.generateRandomFourDigitNumber();
    const emailData = {
        to: 'lukas-dufek@email.cz',
        subject: 'Předmět zprávy',
        text: code,
        attachment: [
            { data: 'base64-encoded-string', alternative: true },
            { path: 'cesta/k/souboru.pdf', type: 'application/pdf', name: 'nazev-souboru.pdf' }
        ]
    };

    const smtpOptions = {
        host: 'lukas-dufek@email.cz',
        port: 587,
        user: 'lukas-dufek@email.cz',
        password: 'Ll728251815'
    };

    email.send(smtpOptions, emailData)
        .then((message) => {
            console.log(`Zpráva byla úspěšně odeslána s id: ${message.messageId}`);
        })
        .catch((err) => {
            console.error(`Chyba při odesílání zprávy: ${err}`);
        });

}


MailSender.generateRandomFourDigitNumber = () => {
    const min = 1000; // nejnižší možné čtyřmístné číslo
    const max = 9999; // nejvyšší možné čtyřmístné číslo
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min; // vygeneruje náhodné číslo v rozsahu od min do max
    return randomNum.toString(); // vrátí náhodné čtyřmístné číslo jako řetězec
}

module.exports = MailSender;


