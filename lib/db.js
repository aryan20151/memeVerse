const mongoose = require('mongoose');

const connectToDB = async()=>{
    const connectionState = mongoose.connection.readyState;
    if(connectionState == 1){
        return;
    }
    if(connectionState == 2){
        return;
    }
    mongoose.connect(process.env.MONGOURL)
    .then(()=>{console.log("Connected !!")})
    .catch(err=>{console.error(err)});
}

module.exports = connectToDB;