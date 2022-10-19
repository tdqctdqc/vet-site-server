const express = require('express');
const mysql = require('mysql');
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


app.get('/', (req, res) => {
    res.send('doot');
});

app.post('/addVeterinarian', (req, res) => {

})

app.listen(PORT, () => console.log(`listening on port ${PORT}`));