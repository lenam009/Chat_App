const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Conversation = new Schema(
    {
        sender: { type: Schema.ObjectId, required: true, ref: 'User' },
        receiver: { type: Schema.ObjectId, required: true, ref: 'User' },
        messages: [
            { type: Schema.ObjectId, ref: 'Message' }
        ]
    },
    {
        collection: 'Conversation',
        timestamps: true,
    },
);

module.exports = mongoose.model('Conversation', Conversation);
