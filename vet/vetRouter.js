const express = require('express')
const vetRouter = express.Router();
const getConnection = require('../db');
const provinces = require('../provinces');
const nameCheck = /^[A-Za-z ]{2,255}$/;
const cityCheck = /^[A-Za-z ]{2,255}$/;

vetRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    let sql = `SELECT * FROM veterinarians WHERE id=${id}`;
    const connection = getConnection();
    let query = connection.query(sql, (err, result) => {
        connection.end();
        if(err) throw err;
        res.json(result);
    });

});


vetRouter.post('/addVet', verifyAdd, async (req, res) => {
    const data = req.body;

    let sql = 'INSERT INTO veterinarians SET ?';
    const connection = getConnection();
    let query = connection.query(sql, data, (err, result) => {
        connection.end();
        if(err) throw err;
        res.json({response: 'got it'});
    });
});

function verifyAdd(req, res, next) {
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

    next();
}
module.exports = vetRouter;