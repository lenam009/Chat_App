const Conversation = require('../models/Conversation');

const getConversation = async (currentUserId) => {
    if (currentUserId) {
        const currentUserConversation = await Conversation.find({
            $or: [{ receiver: currentUserId }, { sender: currentUserId }],
        })
            .sort({ updatedAt: 'desc' })
            .populate('messages')
            .populate('receiver')
            .populate('sender');

        const conversation = currentUserConversation.map((cvs) => {
            // Calc that how many message unseen?
            const constUnseenMsg = cvs.messages.reduce((prev, curr) => {
                if (curr.msgByUserId.toString() !== currentUserId) {
                    return prev + (curr.seen ? 0 : 1);
                } else {
                    return prev;
                }
            }, 0);

            return {
                _id: cvs.id,
                receiver: cvs.receiver,
                sender: cvs.sender,
                unseenMsg: constUnseenMsg,
                lastMsg: cvs.messages[cvs?.messages?.length - 1],
            };
        });

        return conversation;
    } else {
        return [];
    }
};

module.exports = getConversation;
