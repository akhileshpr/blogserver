const mongoose = require('mongoose');
const connectionstring = process.env.CONNECTION_STRING
mongoose.connect(connectionstring).then(()=>{
    console.log('connected successfully...');
    
}).catch((reason)=>{
   console.log(reason);
   console.log('connection failed...');
   
});