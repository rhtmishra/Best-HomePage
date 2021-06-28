const mongoose = require('mongoose');

// createing database

mongoose.connect("mongodb://localhost:27017/rohitdynamic", {
    useCreateIndex:true,
    useFindAndModify:true,
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("Connection Successful to database");
}).catch(error=>{
    console.log(error);
})