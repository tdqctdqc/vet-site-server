const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const vetRouter = require('./vet/vetRouter');
const PORT = 3002;

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/vet', vetRouter);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));