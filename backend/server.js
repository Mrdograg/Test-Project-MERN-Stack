const express = require('express');
const bodyParser = require('body-parser');
const cors =  require('cors');
const User = require('./models/User');
const app = express();
const Port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

app.post('/', async (req, res)=>{
    const { permalink, name, email, password } = req.body;
    try {
        const newUser = await User.create({
            permalink,
            name,
            email,
            password,
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error creating user' });
    }
});


app.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {name, email, password} = req.body;
    try {
        const user = await User.findOne({ where: { id } });
        if (!user){
            return res.status(404).json({ message: 'User not found' });
        }
        user.name = name;
        user.email = email;
        user.password = password;
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error updating user' });
    }

});

app.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const {name, email, password} = req.body;

    try {
        const user = await User.findOne({ where: { id } });
        if (!user){
            return res.status(404).json({ message: 'User not found' });
        }
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = password;
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error updating user' });
    }
});

app.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findOne({ where: { id } });
        if (!user){
            return res.status(404).json({ message: 'User not found' });
        }
        user.deleted = true;
        await user.save();
        res.status(204).json();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
    
})


app.listen(Port, () => 
    console.log(`Server is running at port ${Port}`)
);
