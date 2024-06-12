const mongoose = require('mongoose');
const dbConnect=async()=>{
  try{
    const mongConnect = await mongoose.connect(`${process.env.CONNECTINGSTRING}`);
    console.log(`connection established..${mongConnect.connection.host}`);
    return mongConnect;
  }catch(error){
    console.log(error);
    process.exit(1);
  }
  
}

module.exports = {dbConnect};
