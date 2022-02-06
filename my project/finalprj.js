const express = require('express');
const server = express();
const sqlite3 = require("sqlite3").verbose();
const bparser = require("body-parser");

server.use(express.static('public'));


server.use(bparser.json());

server.use(bparser.urlencoded({ extended: true }));


const db = new sqlite3.Database("./mock.db", sqlite3.OPEN_READWRITE, (err)=>{

    if(err) return console.error(err.message);
 
    console.log("con sucful");
});


//REST API (ENDPOINT=/details)
server.post("/details", function(req,res){

 var personname = req.body.name;

var age = req.body.age;

var gender = req.body.gender;

var area = req.body.area;

var number = req.body.number;

var email = req.body.email;
 

res.json({name:personname,age,gender,area,number,email})


 

const sql = 'INSERT INTO mygym1( personname,age,gender,area,number,email) VALUES(?,?,?,?,?,?)' ;

db.run(sql,[personname,age,gender,area,number,email],(err)=>{
    if(err) 
    return console.error(err.message); 
    
});


 db.close((err)=>{
    if(err) return console.error(err.message);

    console.log("data inserted successfully");

});
});


console.log("runnin");


const sql ='SELECT * FROM mygym1';
db.all(sql,[],(err,rows)=>{

if(err) return console.error(err.message);
 rows.forEach((row)=>{
   console.log(row.personname);
});
});
server.listen(3300)



