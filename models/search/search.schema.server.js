var mongoose = require('mongoose');

var searchSchema = mongoose.Schema({
    searchinput: String,

}, {collection: 'search'});

module.exports = searchSchema;