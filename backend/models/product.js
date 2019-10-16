const mongoose = require('mongoose');

// User Schema
const ProductSchema = mongoose.Schema({
  imagePath: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  
});

const Product = module.exports = mongoose.model('Product', ProductSchema);

module.exports.getProductById = function(id, callback){
  User.findById(id, callback);
}

module.exports.getProductByName = function(productName, callback){
  const query = {productName: productName}
  User.findOne(query, callback);
}


