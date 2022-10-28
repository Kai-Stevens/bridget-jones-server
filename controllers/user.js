const bcrypt = require('bcrypt');

const User = require('../models/User');

async function index (req, res) {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({"error": err.message});
  }
}

async function create (req, res) {
  try {
    // Get the data
    const data = req.body;
    // Generate a salt with a specific cost
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
    console.log(data);
    console.log(salt);
    // Hash the password
    data["user_password"] = await bcrypt.hash(data["user_password"], salt);

    const result = await User.create(data);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).json({"error": err.message})
  }
}

async function show (req, res) {
  try {
      const id = parseInt(req.params.id);
      const user = await User.getOneById(id);
      res.json(user);
  } catch (err) {
      res.status(404).json({"error": err.message})
  }
};

module.exports = {
  index, create, show
}