const Entry = require('../models/Entry');
const Token = require('../models/Token');

// retrieve all posts from all users so I can test without authentication: Delete in production
async function testGetAll (req, res) {
  try {
    const entries = await Entry.testGetAll();
    res.json(entries);
  } catch (err) {
    res.status(500).json({"error": err.message})
  }
}

async function index (req, res) {
  try {

    const userToken = req.headers["authorization"];
    const validToken = await Token.getOneByToken(userToken);

    const author_id  = validToken["user_id"];
    console.log(author_id);
    const entries = await Entry.getAll(author_id);
    console.log("CONTROLLERS: ")
    console.log(entries);
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({"error": err.message});
  }
}

async function create (req, res) {
  try {
    const data = req.body;
    const result = await Entry.create(data);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).json({"error": err.message})
  }
}

async function show (req, res) {
  try {
      const query = req.query;
      const author_id = query.author_id;
      const id = parseInt(req.params.id);
      const entry = await Entry.getOneById(id, author_id);
      res.json(entry);
  } catch (err) {
      res.status(404).json({"error": err.message})
  }
};

async function update(req, res) {
  try {
    const data = req.body;

    const query = req.query;

    const author_id = query.author_id;
    const id = parseInt(req.params.id);

    const entry = await Entry.getOneById(id, author_id);
    const updated = await entry.update(data);

    res.json(updated);
  } catch (err) {
    res.status(404).json({"error": err.message})
  }
}

async function destroy(req, res) {
  try {
    const query = req.query;

    const id = parseInt(req.params.id); 
    const author_id = query.author_id;

    const entry = await Entry.getOneById(id, author_id);
    const deleted = await entry.destroy();

    res.json(deleted);

  } catch (err) {
    res.status(404).json({"error": err.message});
  }
};

module.exports = {
  index, create, show, update, destroy, testGetAll
}
