const mongoose= require('mongoose');

//Harvester Schema
const BbcSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
      },
    
    address: {

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

const Bbc = module.exports = mongoose.model('Bbc', BbcSchema);

module.exports.getBbcById = (id, callback)=>{
    Bbc.findById(id, callback);

}

module.exports.getBbcByName = (BbcName, callback)=>{
    const query = {bbcName: BbcName}
    Bbc.findOne(query, callback);
}