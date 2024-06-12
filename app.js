require('dotenv').config();
const express = require('express');
const app = express();
require('express-async-errors');
const {dbConnect} = require ('./db/connect.js');
const products = require('./routes/products.js');

const notFoundMiddleware = require('./middleware/not-found.js');
const errorMiddleware = require('./middleware/error-handler.js');


const port  = process.env.PORT || 5000;
app.use(express.json());
app.use('/api/v1/products', products);
app.get('/',(req,res)=>{
  res.send("store api");
});
app.use(notFoundMiddleware);
app.use(errorMiddleware);
async function main(){
  try{
    await dbConnect();
    app.listen(port,()=>console.log("port is listening.."));
  }catch(error){
    console.log(error);
  }
  
};

main();

