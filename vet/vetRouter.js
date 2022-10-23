const express = require('express')
const vetRouter = express.Router();
const getConnection = require('../db');
const provinces = require('../provinces');
const nameCheck = /^[A-Za-z ]{2,255}$/;
const cityCheck = /^[A-Za-z ]{2,255}$/;

vetRouter.get('/', async (req, res) => {
    let sql = 'SELECT * FROM veterinarians';
    const connection = getConnection();
    let query = connection.query(sql, (err, result) => {

    });
})
vetRouter.post('/:vetId/clients/:clientId/patients', verifyAddPatient, async (req, res) => {
    const data = req.body;
    const clientId = req.params.clientId;
    data['client'] = clientId;
    console.log('getting add patient post');
    let sql = 'INSERT INTO patients SET ?';
    const connection = getConnection();
    let query = connection.query(sql, data, (err, result) => {
        connection.end();
        if(err) throw err;
        res.json({response: 'got it'});
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

vetRouter.get('/:id/clients', async (req, res) => {
    const id = req.params.id;
    let sql = `SELECT * FROM clients WHERE veterinarian=${id}`;
    const connection = getConnection();
    let query = connection.query(sql, (err, result) => {
        connection.end();
        if(err) throw err;
        // console.log(result);
        res.json(result);
    });
});

vetRouter.get('/:id/patients', async (req, res) => {
    const id = req.params.id;
    let clientsSql = `SELECT id FROM clients WHERE veterinarian=${id}`;
    const connection1 = getConnection();
    let clientsQuery = connection1.query(clientsSql, (err, result) => {
        connection1.end();
        if(err) throw err;
        const clientIds = result.map(r => r.id);
        console.log(clientIds);
        patientsCallback(clientIds);
        // res.json(result);
    });
    //bad, use mysql2 for promise-ifying queries
    function patientsCallback(clientIds) {
        //bad syntax here
        let patientsSql = `SELECT * FROM patients WHERE client IN (${clientIds})`;
        const connection2 = getConnection();
        let patientsQuery = connection2.query(patientsSql, (err, result) => {
            connection2.end();
            if(err) throw err;
            console.log(result);
            res.json(result);
        });
    }

    
})

vetRouter.get('/:vetId/clients/:clientId', async (req, res) => {
    const vetId = req.params.vetId;
    const clientId = req.params.clientId;
    console.log(`getting client data ${clientId}`)

    let sql = `SELECT * FROM clients WHERE id=${clientId}`;
    const connection = getConnection();
    let query = connection.query(sql, (err, result) => {
        connection.end();
        if(err) throw err;
        res.json(result[0]);
    });
});

vetRouter.get('/:vetId/clients/:clientId/patients', async (req, res) => {
    const vetId = req.params.vetId;
    const clientId = req.params.clientId;
    console.log(`getting client patients data ${clientId}`)

    let sql = `SELECT * FROM patients WHERE client=${clientId}`;
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

    let sql = 'INSERT INTO clients SET ?';
    const connection = getConnection();
    let query = connection.query(sql, data, (err, result) => {
        connection.end();
        if(err) throw err;
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
function verifyAddPatient(req, res, next) {
    const data = req.body;
    if(!data.name || !nameCheck.test(data.name)) {
        throw 'Submitted name is not valid.';
    }
    if(!data.species || !nameCheck.test(data.species)) {
        throw 'Submitted species is not valid.';
    }

    next();
}
module.exports = vetRouter;