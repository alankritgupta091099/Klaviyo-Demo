require('./models/db');
require('dotenv').config();

var express = require('express');
const path=require('path');
const bodyParser=require('body-parser');
const cors=require('cors');

var app = express();
app.use(cors());

//Import All Middlewares Here
const auth = require('./middlewares/auth.js');
const Middlewares = [auth];

//Import all Route Files here
const flows=require('./routes/flows');
const users=require('./routes/user');
const emails=require('./routes/email');
const campaigns=require('./routes/campaign');
const segments=require('./routes/segment');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const PORT = process.env.PORT || 8081;

if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'))

    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log('server started at port: ',PORT);
});

//routes
app.use('/flows', Middlewares , flows);
app.use('/emails', Middlewares , emails);
app.use('/campaigns', Middlewares , campaigns);
app.use('/segments', Middlewares , segments);
app.use('/users', users);