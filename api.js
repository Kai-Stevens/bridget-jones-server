const express = require('express');
const cors = require('cors');

const logRoutes = require('./middleware/logger');
// const postRouter = require('./routers/post');
// const userRouter = require('./routers/user');

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