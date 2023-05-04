const Router  = require('express')
const nodemailer = require("nodemailer");
const Client = require('../../models/Client')
const sendMailRouter = Router()

const myPaymentsTools = require('../../scripts/paymentsTools');


sendMailRouter.get('/', (req, res) => {


})


sendMailRouter.post('/', async (req, res) => {
    const {to} = req.body;


    const transporter = nodemailer.createTransport({

        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'stindufek@gmail.com',
            pass: 'tdyacsqzwliqgzaj',
            //pass: 'Frameworkvuejs12',
        },
    });

    let code = myPaymentsTools.generate_number();

    const mailOptions = {
        from: '"You" <stinbanka@gmail.com>',
        to: to,
        subject: `StinBank`,
        html: `
        <h1>Dobrý den</h1>
        <p>Aktivační kod pro StinBank je: ${code}</p>`
    };

     await transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else {
            console.log(`E-mail byl úspěšně odeslán: ${info.response}`);
            res.status(200).send('E-mail byl úspěšně odeslán.');
            const client = await Client.findOne({"mail": to}).exec()
            //console.log(client._id);
            await Client.findByIdAndUpdate(client._id, {"code": code});
        }
    });

    console.log(code)
});

module.exports = sendMailRouter;
