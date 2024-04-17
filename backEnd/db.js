const mysql = require('mysql2')

const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "12345678",
    database: "stoc- trading-application",
    port: "3306",
});

con.connect((error)=>{
    if(error==true){
        console.log(error)
    }
    else{
        console.log("database connected")
    }
})

module.exports = con;