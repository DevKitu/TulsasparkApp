const mongoose= require('mongoose');
const bcrypt= require('bcryptjs');
const config = require('../../config/database');

// Address Schema
const addressSchema = mongoose.Schema({
    addressType: {
                type: String,
                
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
});

// Bank details Schema
const bankDetailsSchema = mongoose.Schema({
    bankName: {
                type: String,
                required: true
    },
    branchName: {
        type: String,
        required: true
    },
    accountNumber: {
        type: Number,
        required: true
    },
    accountHolderName: {
        type: String,
        required: true
    },
   
});


//Harvester Schema
const HarvesterSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true,
        default: Date.now
    },
    idNumber: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cellphone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    address: addressSchema,
    
    bankDetails: bankDetailsSchema,
});

const Harvester = module.exports = mongoose.model('Harvester', HarvesterSchema);

module.exports.getHarvesterById = (id, callback)=>{
    User.findById(id, callback);

}

module.exports.getHarvesterByUserName = (harvesterName, callback)=>{
    const query = {harvesterName: harvesterName}
    User.findOne(query, callback);
}