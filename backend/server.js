const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/User'); 
const app = express();
const Port = 5000;

app.use(bodyParser.json());

app.get('/', async (req, res) => {
    try {
        const users = User.findAll(); 
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.listen(Port, () => 
    console.log(`Server is running at port ${Port}`)
);
