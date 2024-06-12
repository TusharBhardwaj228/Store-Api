require('dotenv').config();
const {dbConnect} = require ('./db/connect.js');
const Product = require('./models/product.js');
const products = require('./products.json');

async function importingProducts(){
  try{
    await dbConnect();
    await Product.deleteMany();
    await Product.create(products);
    console.log('success!!');
    process.exit(0);
  }catch(error){
    console.log(error);
    process.exit(1);
  }
}
importingProducts();
