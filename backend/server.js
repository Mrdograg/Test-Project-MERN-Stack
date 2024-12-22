const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { User } = require('./models');
const { sequelize } = require('./models');
const { Op } = require('sequelize');
const app = express();
const Port = 5000;

app.use(cors());
app.use(bodyParser.json());
sequelize.sync();

// Fetch all users with pagination, filters, and search
app.get('/', async (req, res) => {
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
    console.error('Error fetching users:', error.message);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Fetch a single user by ID
app.get('/:id', async (req, res) => {
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

// Create a new user
app.post('/', async (req, res) => {
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

// Update a user by ID
app.put('/:id', async (req, res) => {
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

// Partially update a user by ID
app.patch('/:id', async (req, res) => {
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

// Delete a user by ID
app.delete('/:id', async (req, res) => {
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

// Start the server
app.listen(Port, () => {
  console.log(`Server is running at port ${Port}`);
});
