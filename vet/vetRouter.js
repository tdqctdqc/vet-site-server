const express = require('express')
const vetRouter = express.Router();

vetRouter.get('/', (req, res) => {
    console.log('got');
    res.json({message: 'got'});
})

vetRouter.post('/addVet', (req, res) => {
    const data = req.body;
    let sql = 'INSERT INTO veterinarians SET ?';
    let query = db.query(sql, data, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.json({response: 'got it'});
    })
})
module.exports = vetRouter;