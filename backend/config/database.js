const mongoose = require('mongoose');

const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_LOCAL_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(con=>{
        console.log(`mongodb is connected to host ${con.connection.host}`)
    }).catch((err)=>{
        console.log(err)
    })
    
}

module.exports = connectDatabase