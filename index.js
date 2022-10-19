const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const PORT = 3002;
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

const app = express();
app.use(express.json());
app.use(cors());

app.post('/addVet', (req, res) => {
    const data = req.body;
    let sql = 'INSERT INTO veterinarians SET ?';
    let query = db.query(sql, data, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.json({response: 'got it'});
    })
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`));