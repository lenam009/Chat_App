const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new Schema(
    {
        text: { type: String, default: '' },
        imageUrl: { type: String, default: '' },
        videoUrl: { type: String, default: '' },
        seen: { type: Boolean, default: false },
        msgByUserId: { type: Schema.ObjectId, require: true, ref: 'User' },
    },
    {
        collection: 'Message',
        timestamps: true,
    },
);

module.exports = mongoose.model('Message', Message);
