const mongodb = require('mongodb');
const mongoose = require ('mongoose');

const aplicationSchema = new mongoose.Schema({
    salutation : {
        type : String,
        require: true
    },
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    gender : {
        type : String,
        require : true
    },
    dob : {
        type : String,
        require : true
    },
    address : {
        type : String,
        require : true
    },
    qualification : {
        type : String,
        require : true
    },
    profession : {
        type : String,
        require : true
    },
    nominee : {
        type : String,
        require : true
    },
    relation : {
        type : String,
        require : true
    },
    insuranceId : {
        type : String,
        require : true
    },
    status:{
        type:String,
        require: true
    },
    avatars:{
        type:String
    }
})

const applicationDb = mongoose.model('application',aplicationSchema);
module.exports = applicationDb
