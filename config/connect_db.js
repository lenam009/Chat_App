module.exports = { connect };
const mongoose = require('mongoose');

async function connect() {

    try {
        console.log("123", process.env.MONGODB_URL);

        await mongoose
            .connect(process.env.MONGODB_URL)
            .then(() => console.log('Connected!'));

    } catch (error) {
        console.log('Connection failed', error);
    }
}

module.exports = { connect };
