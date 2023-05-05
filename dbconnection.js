const mysql=require("mysql2")

const db_connection = mysql
         .createConnection({
            host: "localhost", //HOST NAME
            user: "root", // USER NAME
            database: "vidma", //DATABASE NAME
            password: "", // DATABASE PASSWORD
         })

         .on("error", (err) => {
            //see error here
         });

         module.exports = db_connection