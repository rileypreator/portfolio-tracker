var mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
    id: { type: String, required: true },
    maxItemId: {type: Number, required: true}
 });
 
 module.exports = mongoose.model('Sequence', sequenceSchema);