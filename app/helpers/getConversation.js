const Conversation = require('../models/Conversation');

// No optimize
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

            const { password, ...receiver } = cvs.receiver._doc;
            const { password: passwordSender, ...sender } = cvs.sender._doc;

            return {
                _id: cvs.id,
                receiver,
                sender,
                unseenMsg: constUnseenMsg,
                lastMsg: cvs.messages[cvs?.messages?.length - 1],
            };
        });

        return conversation;
    } else {
        return [];
    }
};

// Use in sidebar chatApp
// **  chỉ xóa và thêm item bị thay đổi trong conversations sidebar của react (xử lý việc thêm xóa này bên react) *********
const getOneConversation = async (sender, receiver) => {
    if (sender && receiver) {
        const currentUserConversation = await Conversation.find({
            $or: [
                { sender: sender, receiver: receiver },
                { sender: receiver, receiver: sender },
            ],
        })
            .populate('sender')
            .populate('receiver')
            .populate({ path: 'messages', options: { sort: { createAt: 'asc' } } });

        const constUnseenMsg = currentUserConversation.messages.reduce((prev, curr) => {
            if (curr.msgByUserId.toString() !== sender) {
                return prev + (curr.seen ? 0 : 1);
            } else {
                return prev;
            }
        }, 0);

        return {
            _id: currentUserConversation.id,
            receiver: currentUserConversation.receiver,
            sender: currentUserConversation.sender,
            unseenMsg: constUnseenMsg,
            lastMsg: currentUserConversation.messages[currentUserConversation?.messages?.length - 1],
        };
    }
};

module.exports = getConversation;
