// hostinger connection code: 

// import mysql from 'mysql';

// const poolAdmin = mysql.createPool({
//     connectionLimit: 10, // Limits simultaneous connections
//     host: '193.203.184.87',
//     user: 'u670432001_CONREACTADMIN',
//     password: 'Conreactadmin@2025',
//     database: 'u670432001_CONREACTADMIN',
//     timezone: "Z",
//     connectTimeout: 10000, // 10 seconds timeout
//     waitForConnections: true,
//     queueLimit: 0,
// });

// // Get a connection from the pool
// poolAdmin.getConnection((err, connection) => {
//     if (err) {
//         console.error("Database connection error:", err.code);
//         return;
//     }
//     console.log("Connected to MySQL Admin Database");
//     connection.release(); // Release the connection
// });

// // Handling global errors
// poolAdmin.on('error', (err) => {
//     console.error("MySQL Pool Error:", err);
//     if (err.code === "PROTOCOL_CONNECTION_LOST") {
//         console.log("Attempting to reconnect...");
//     }
// });

// export default poolAdmin;




// local connection code: 

import { createConnection } from 'mysql';


 const conadmin = createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'con_admin',
     timezone: "Z"
 });
 conadmin.connect((err)=>{
if(err){
    console.error("error connection" + err.sqlMessage);
    return;
}
console.log("connection ok1")
 });

 export default conadmin;

