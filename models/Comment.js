const mongoose = require('mongoose');

let commentSchema = mongoose.Schema({
    fullName: {type: String, required: true},
    email: {type: String},
    content: {type: String, required: true},
    article: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Article'},
    date: {type: Date, default: Date.now()},
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;