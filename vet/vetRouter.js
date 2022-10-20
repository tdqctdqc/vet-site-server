const express = require('express')
const vetRouter = express.Router();
const getConnection = require('../db');
const provinces = require('../provinces');
const nameCheck = /^[A-Za-z ]{2,255}$/;
const cityCheck = /^[A-Za-z ]{2,255}$/;




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

vetRouter.post('/:id/addClient', verifyAdd, async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    data['veterinarian'] = id;


    console.log('adding client for vet ' + id);

    let sql = 'INSERT INTO clients SET ?';
    const connection = getConnection();
    let query = connection.query(sql, data, (err, result) => {
        connection.end();
        if(err) throw err;
    });
});

function verifyAdd(req, res, next) {
    const data = req.body;
    console.log(data);
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