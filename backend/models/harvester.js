const mongoose= require('mongoose');


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
    phoneNumber: {
        type: String,
        required: true
      },
    dateOfBirth: {
        type: String,
        required: true
      },
    
    bankDetails: {
        
        bankName: {
            type: String,
            required: true
        },
        branch: {
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

      },
      address: {
        addressType: {
            type: String,
            
        },
        street: {
            type: String,
            required: true
        },
        suburb: {
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
      },
    
});

const Harvester = module.exports = mongoose.model('Harvester', HarvesterSchema);

module.exports.getHarvesterById = (id, callback)=>{
  Harvester.findById(id, callback);

}

module.exports.getHarvesterByUserName = (harvesterName, callback)=>{
    const query = {harvesterName: harvesterName}
    Harvester.findOne(query, callback);
}