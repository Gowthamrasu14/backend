// hostinger connection code: 

// import mysql from 'mysql';

// const pool = mysql.createPool({
//     connectionLimit: 10, // Limits simultaneous connections
//     host: '193.203.184.87', 
//     user: 'u670432001_CONREACT',
//     password: 'Conreact@2025',
//     database: 'u670432001_CONREACT',
//     timezone: "Z",
//     connectTimeout: 10000, // 10 seconds timeout
//     waitForConnections: true,
//     queueLimit: 0,
// });

// pool.getConnection((err, connection) => {
//     if (err) {
//         console.error("Database connection error:", err.code);
//         return;
//     }
//     console.log("Connected to MySQL");
//     connection.release(); // Always release the connection back to the pool
// });

// // Handling errors globally
// pool.on('error', (err) => {
//     console.error("MySQL Pool Error:", err);
//     if (err.code === "PROTOCOL_CONNECTION_LOST") {
//         console.log("Attempting to reconnect...");
//     }
// });

// export default pool;









// local connection code: 

import { createConnection } from 'mysql';


 const con = createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'con_user',
     timezone: "Z"
 });
 con.connect((err)=>{
if(err){
    console.error("error connection" + err.stack);
    return;
}
console.log("connection ok")
 });

 export default con;
