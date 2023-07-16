const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    sender: {type: mongoose.Schema.Types.ObjetId, ref: 'User'},
    recipient: {type: mongoose.Schema.Types.ObjetId, ref: 'User'},
    text: String,
}, {timestamps:true});

const MessageModel = mongoose.model('Menssage', MessageSchema);

module.export = MessageModel;