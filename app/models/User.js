const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        //required: [true, "Please provide name..."] not available auto validate data
        name: { type: String, required: [true, 'Please provide name...'] },
        email: { type: String, required: [true, 'Please provide email...'], unique: true },
        password: { type: String, required: [true, 'Please provide password...'] },
        profile_pic: { type: String, default: '' },
    },
    {
        collection: 'User',
        timestamps: true,
    },
);

module.exports = mongoose.model('User', User);
