const express = require('express')
const vetRouter = express.Router();
const getConnection = require('../db');
const provinces = require('../provinces');
const nameCheck = /^[A-Za-z ]{2,255}$/;
const cityCheck = /^[A-Za-z ]{2,255}$/;

vetRouter.get('/', (req, res) => {
})
vetRouter.post('/testForm', (req, res) => {
    console.log(req.body);    
});


vetRouter.post('/addVet', async (req, res) => {
    const data = req.body;
    if(!data.name || !nameCheck.test(data.name)) {
        throw 'Submitted name is not valid.';
    }
    if(!data.city || !cityCheck.test(data.city)) {
        throw 'Submitted city is not valid.';
    }
    if(!provinces.includes(data.province)) {
        throw 'Submitted province is not valid.';
    }

    let sql = 'INSERT INTO veterinarians SET ?';
    const connection = getConnection();
    let query = connection.query(sql, data, (err, result) => {
        connection.end();
        if(err) throw err;
        res.json({response: 'got it'});
    });
});

function verifyAdd() {
    
}
module.exports = vetRouter;