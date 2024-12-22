const express = require('express');
const bodyParser = require('body-parser');
const cors =  require('cors');
const User = require('./models/User');
const { Op } = require('sequelize');
const app = express();
const Port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', async (req, res) => {  // Fetch with specific pagination and filter
    const { limit = 5, offset = 0, filter, search, sortKey = 'id', sortOrder = 'ASC' } = req.query;

    const whereClause = {};
    if (filter) whereClause.enabled = filter === 'true';
    if (search) whereClause.name = { [Op.like]: `%${search}%` };

    try {
        const users = await User.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [[sortKey, sortOrder.toUpperCase()]],
        });
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});


app.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

app.post('/', async (req, res) => { // new creation API
    const { permalink, name, email, password, enabled, deleted } = req.body;

    if (!permalink || !name || !email || !password || enabled === undefined || deleted === undefined) {
        return res.status(400).json({ 
            error: 'All fields (permalink, name, email, password, enabled, deleted) are required' 
        });
    }

    try {
        const newUser = await User.create({
            permalink,
            name,
            email,
            password,
            enabled,
            deleted,
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(400).json({ error: 'Failed to create user' });
    }
});

app.put('/:id', async (req, res) => { // update API
    const { id } = req.params;
    const { permalink, name, email, password, enabled, deleted } = req.body;

    if (!permalink || !name || !email || !password || enabled === undefined || deleted === undefined) {
        return res.status(400).json({ 
            error: 'All fields (permalink, name, email, password, enabled, deleted) are required' 
        });
    }

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const updatedUser = await user.update({
            permalink,
            name,
            email,
            password,
            enabled,
            deleted,
        });

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(400).json({ error: 'Failed to update user' });
    }
});

app.patch('/:id', async (req, res) => {  // update particularly API
    const { id } = req.params;
    const fieldsToUpdate = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const updatedUser = await user.update(fieldsToUpdate);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(400).json({ error: 'Failed to update user' });
    }
});

app.delete('/:id', async (req, res) => {  //delete API
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        else{
        await user.destroy();
        res.status(204).send();
        console.log(`User id = ${id} deleted`);
}    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

app.listen(Port, () => {
    console.log(`Server is running at port ${Port}`);
});