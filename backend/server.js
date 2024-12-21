const express = require('express');
const db = require('./database/db');
const bodyParser = require('body-parser');
const app = express();
const Port = 5000;

app.use(bodyParser.json());
app.get('/', (req, res) => {
    db.query('SELECT * FROM User', (error, results) => {
        if (error) {
            console.error('Error querying the database:', error);
            res.status(500).json({ error: 'Database query failed' });
        } else {
            res.json(results);
        }
    });
});

app.listen(Port, () => 
    console.log(`Server is running at port ${Port}`));
