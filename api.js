const express = require('express');
const cors = require('cors');

const logRoutes = require('./middleware/logger');
const entryRouter = require('./routers/entry');
const userRouter = require('./routers/user');

const api = express();

api.use(cors());
api.use(express.json());
api.use(logRoutes);

api.get("/", (req, res) => {
    res.json({
        name: "Diary",
        description: "A Diary API for Bridget Jones"
    });
});

api.use("/entries", entryRouter);
api.use("/users", userRouter);

module.exports = api;