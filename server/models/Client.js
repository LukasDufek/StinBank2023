const mongoose = require('mongoose');


let Client = new mongoose.Schema({
    first_name: String,
    last_name: String,
    mail: String,
    password: String,
    code:Number,
    accounts:[
        {
            account_number: Number,
            currency: String,
            balance:Number

        },


    ],
    payments:[
                {
                    from_account: Number,
                    to_account:Number,
                    money:Number,
                    currency:String,
                    date_of_transaction:String
                }
     ],

});

module.exports = mongoose.model('Client', Client);
