const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const vetRouter = require('./vet/vetRouter');
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
app.use('/vet', vetRouter);
// console.log(vetRouter);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));