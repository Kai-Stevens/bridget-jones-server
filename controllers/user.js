const bcrypt = require('bcrypt');

const User = require('../models/User');
const Token = require('../models/Token');

async function index (req, res) {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({"error": err.message});
  }
}

async function register (req, res) {
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

async function login (req, res) {
  try {
      const user = await User.getOneByUsername(req.body.username);

      const authenticated = await bcrypt.compare(req.body.user_password, user["user_password"]);

      if (!authenticated) {
          throw new Error("Incorrect credentials.");
      } else {

          const token = await Token.create(user["user_id"]);

          res.status(200).json({ authenticated: true, token: token.token });
      }
  } catch (err) {
      res.status(403).json({"error": err.message})
  }
}

module.exports = {
  index, register, show, login
}