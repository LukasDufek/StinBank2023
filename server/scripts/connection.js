const mongoose = require('mongoose');

const createConnection = {};

createConnection.connect_database = () => {
    mongoose
        .connect('mongodb+srv://lukasdufek:frameworkvuejs@clients0.m8fjmpg.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
        })
        .then(() => {
            console.log(`Database connected successfully`)
        }).catch(err => {
        console.log(`Unable to connect with the database ${err}`)
    });

}

createConnection.disconnect_database = () => {
    mongoose.disconnect()
}

module.exports = createConnection;
