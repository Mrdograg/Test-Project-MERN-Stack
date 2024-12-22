const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { User } = require('./models');
const { Op } = require('sequelize');
const app = express();
const Port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', async (req, res) => { // Fetch all with pagination, filters feature
  const { limit = 6, offset = 0, filter, search, sortKey = 'id', sortOrder = 'ASC' } = req.query;

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
    console.error('Error fetching users:', error.message);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get('/:id', async (req, res) => { // Fetch a user
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

app.post('/', async (req, res) => { // Create a user
  const { permalink, name, email, password, enabled, deleted } = req.body;

  if (!permalink || !name || !email || !password || enabled === undefined || deleted === undefined) {
    return res.status(400).json({
      error: 'All fields (permalink, name, email, password, enabled, deleted) are required',
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
    console.error('Error creating user:', error.message);
    res.status(400).json({ error: 'Failed to create user' });
  }
});

app.put('/:id', async (req, res) => { //update a user with complete details
  const { id } = req.params;
  const { permalink, name, email, password, enabled, deleted } = req.body;

  if (!permalink || !name || !email || !password || enabled === undefined || deleted === undefined) {
    return res.status(400).json({
      error: 'All fields (permalink, name, email, password, enabled, deleted) are required',
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
    console.error('Error updating user:', error.message);
    res.status(400).json({ error: 'Failed to update user' });
  }
});

app.patch('/:id', async (req, res) => { // partially update a user
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
    console.error('Error updating user:', error.message);
    res.status(400).json({ error: 'Failed to update user' });
  }
});

app.delete('/:id', async (req, res) => { //delete a user
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();
    res.status(204).send();
    console.log(`User id = ${id} deleted`);
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

app.listen(Port, () => {
  console.log(`Server is running at port ${Port}`);
});
