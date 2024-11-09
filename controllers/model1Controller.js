// controllers/model1Controller.js
const Model1 = require('../models/model1');

// Example function to create a new entry in model1
async function createModel1(req, reply) {
  const { name, description } = req.body;

  try {
    const newEntry = await Model1.create({ cc, age, hoi, user, full_response });
    return reply.code(201).send(newEntry);
  } catch (error) {
    return reply.code(500).send({ error: 'Error creating entry in model1' });
  }
}

// Example function to get all entries in model1
async function getAllModel1(req, reply) {
  try {
    const entries = await Model1.findAll();
    return reply.send(entries);
  } catch (error) {
    return reply.code(500).send({ error: 'Error fetching entries from model1' });
  }
}

module.exports = {
  createModel1,
  getAllModel1,
};
