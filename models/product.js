const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true, "Name must be present."]
  },
  price:{
    type:Number,
    required:[true, "Price must be present."]
  },
  featured:{
    type:Boolean,
    default:false
  },
  rating:{
    type:Number,
    default:4.5
  },
  createdAt:{
    type:Date,
    default:Date.now()
  },
  company:{
    type:String,
    enum:{
      values:['ikea', 'liddy', 'caressa', 'marcos'],
      message:'{VALUE} is not supported.'
    }
  }

},{timestamps:true});

module.exports = mongoose.model('Product', productSchema);