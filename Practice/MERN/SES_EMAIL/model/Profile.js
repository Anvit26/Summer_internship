const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema(
    {
        username:{type:String,required:true,unique:true},
        isPrime:{type:Boolean,require:true,default:false},
        isVerified:{type:Boolean,required:true,default:false},
        firstname:{type:String,require:true},
        lastname:{type:String,require:true},
        phone:{type:Number,required:true},
    },
    {collection:'userProfile'}
);

const model = mongoose.model('ProfileSchema',ProfileSchema);

module.exports = model;