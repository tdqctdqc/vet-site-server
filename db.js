const mysql = require('mysql');


function getConnection() {
    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'vet_site'
    });
    
    db.connect(err => {
        if(err) {
            throw err;
        }
        console.log('connected to db');
    });

    return db;
}

module.exports = getConnection;