const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
    insurance: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    details: {
        type:String
    }
})

const policyDb = mongoose.model('policy',policySchema);
module.exports = policyDb