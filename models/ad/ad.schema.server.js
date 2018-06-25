var mongoose = require('mongoose');

var adSchema = mongoose.Schema({
    title: String,
    category: String,
    description: String,
    price: Number,
    image: [],
    username: String,
    email: String,
    phone: Number,
    seller: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}

}, {collection: 'ad'});

module.exports = adSchema;