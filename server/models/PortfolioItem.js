var mongoose = require('mongoose');

const PortfolioItemSchema = mongoose.Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    link: {type: String},
    description: {type: String, required: true},
    date: {type: String}
});

module.exports = mongoose.model('PortfolioItem', PortfolioItemSchema)