require('dotenv').config()
require('./Database/connection');

const express = require('express');
const cors = require('cors');
const route = require('./routes/route')
const server = express();
server.use(cors());
server.use(express.json());
server.use(route)
server.use('/Uploads',express.static('./Uploads'));
const PORT = 3000
server.listen(PORT,()=>{
    console.log(`server running at port ${PORT}`);
});