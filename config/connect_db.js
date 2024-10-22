const mongoose = require('mongoose');

async function connect() {
    try {
        console.log('123', process.env.MONGODB_URI);

        await mongoose.connect(process.env.MONGODB_URI).then((res) => {
            console.log('Connected!');
            return res;
        });
    } catch (error) {
        console.log('Connection failed', error);
    }
}

module.exports = { connect };
