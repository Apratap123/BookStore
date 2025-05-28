const mongoose = require("mongoose");


const connection = async() =>{
  try{
  
  await mongoose.connect(process.env.MONGODB_URL)
  }
  catch(error){
    console.log(error);
  }
}


module.exports = connection;


