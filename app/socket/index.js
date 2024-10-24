const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const getUsersDetailFromToken = require('../helpers/getUsersDetailFromToken');
const User = require('../models/User');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const getConversation = require('../helpers/getConversation');
const app = express();

/** Socket connection */
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL,
    },
});

/** Socket is running at http://localhost:8080 */

// Online user
const onlineUser = new Set();

io.on('connection', async (socket) => {
    const token = socket.handshake.auth.token;

    // Current user
    const user = await getUsersDetailFromToken(token);

    // Create a room
    socket.join(user?._id?.toString());
    onlineUser.add(user?._id?.toString());

    io.emit('onlineUser', Array.from(onlineUser));

    socket.on('message-page', async (userId) => {
        const userDetail = await User.findById(userId)
            .select('-password')
            .catch(() => null);

        const payload = {
            _id: userDetail?._id,
            name: userDetail?.name,
            email: userDetail?.email,
            profile_pic: userDetail?.profile_pic,
            online: onlineUser.has(userId),
        };

        socket.emit('message-user', payload);

        /** Get message at start open messageBox */
        const getConversationMessage = await Conversation.findOne({
            $or: [
                { sender: user?._id, receiver: userId },
                { sender: userId, receiver: user?._id },
            ],
        })
            .populate('messages')
            .sort({ updatedAt: 'desc' });

        socket.emit('message', getConversationMessage?.messages);
    });

    /** New Message !!!!!! important !!!!!!!!!!!!!!!!!.................................... */
    socket.on('new message', async (data) => {
        //** Check conversation is available both user ? */
        let conversation = await Conversation.findOne({
            $or: [
                { sender: data?.sender, receiver: data?.receiver },
                { sender: data?.receiver, receiver: data?.sender },
            ],
        });

        /** If conversation is not available */
        if (!conversation) {
            conversation = await Conversation.create({ sender: data?.sender, receiver: data?.receiver });
        }

        //** Save message */
        const saveMessage = await Message.create({
            text: data?.text,
            imageUrl: data?.imageUrl,
            videoUrl: data?.videoUrl,
            msgByUserId: data?.msgByUserId,
        });

        /** Update Message into Conversation */
        const updateConversation = await Conversation.updateOne(
            { _id: conversation._id },
            { $push: { messages: saveMessage._id } },
        ).catch((err) => console.log('error updateConversation'));

        const getConversationMessage = await Conversation.findOne({
            $or: [
                { sender: data?.sender, receiver: data?.receiver },
                { sender: data?.receiver, receiver: data?.sender },
            ],
        })
            .populate('messages')
            .sort({ updatedAt: 'desc' });

        /** Send message to both user */
        io.to(data?.sender).emit('message', getConversationMessage?.messages);
        io.to(data?.receiver).emit('message', getConversationMessage?.messages);

        /** Send conversation */
        const conversationSender = await getConversation(data?.sender);
        const conversationReceiver = await getConversation(data?.receiver);

        io.to(data?.sender).emit('conversation', conversationSender);
        io.to(data?.receiver).emit('conversation', conversationReceiver);
    });

    /** Side bar */
    socket.on('sidebar', async (currentUserId) => {
        const conversation = await getConversation(currentUserId);

        socket.emit('conversation', conversation);
    });

    socket.on('seen', async (msgByUserId) => {
        const conversation = await Conversation.findOne({
            $or: [
                { sender: user?._id, receiver: msgByUserId },
                { sender: msgByUserId, receiver: user?._id },
            ],
        });

        const conversationMessageId = conversation?.messages || [];

        // console.log('conversation?.messages', conversation?.messages);

        const updateMessage = await Message.updateMany(
            { _id: { $in: conversationMessageId }, msgByUserId: msgByUserId },
            { $set: { seen: true } },
        );

        /** Send conversation */
        const conversationSender = await getConversation(user?._id.toString());
        const conversationReceiver = await getConversation(msgByUserId);

        io.to(user?._id.toString()).emit('conversation', conversationSender);
        io.to(msgByUserId).emit('conversation', conversationReceiver);
    });

    /** Disconnect */
    socket.on('disconnect', () => {
        onlineUser.delete(user?._id);
    });
});

module.exports = {
    app,
    server,
};
