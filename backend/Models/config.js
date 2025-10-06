const mongoose = require('mongoose');

mongoose.set('debug',true);

const AUTHURL = String(process.env.AUTH_DB);

const AUTHDB = mongoose.createConnection(AUTHURL);

AUTHDB.on('connected',()=>{
    console.log('Auth DB connected');
});

AUTHDB.on('error',(err)=>{
    console.log('AUTH DB error:',err);
});

const MENUURL = String(process.env.MENU_DB);

const MENUDB = mongoose.createConnection(MENUURL);

MENUDB.on('connected',()=>{
    console.log('MENU DB connected');
});

MENUDB.on('error',(err)=>{
    console.log('MENU DB Error:',err);
});

const PROFILE_URL = String(process.env.PROFILE_DB);

const PROFILEDB = mongoose.createConnection(PROFILE_URL);

PROFILEDB.on('connected',()=>{
    console.log('Prfile DB connected');
});

PROFILEDB.on('error',(error)=>{
    console.log('Profile DB Error',error);
});

module.exports={
    AUTHDB,
    MENUDB,
    PROFILEDB
};
