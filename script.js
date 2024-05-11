console.log("Hey this is a working project")
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');


// MySQL connection configuration
const connection = mysql.createConnection({
    host: 'mydb1.c9gq26i2ox3q.ap-south-1.rds.amazonaws.com',
    user: 'admin',
    password: 'redhat123',
    database: 'mydb1'
})

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.post('/query', (req, res) => {
    const query = req.body.query;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Error executing query' });
            return;
        }
        console.log('Query result:', results);
        res.json(results);
    });
});


app.listen(3000,() =>{
    console.log("App listening on port 3000")
})