const express = require("express");
require("express-async-errors");
const database = require('../services/database');
const { validate } = require("../validators/academic-year");
const auth = require("../middleware/auth");
const permission = require("../middleware/permission");
const validateBody = require("../middleware/validate-body");
const handler = require("./handler");
const router = express.Router();

router.post(`/`, async (req, res) => {
    const primaryKey = ['id'];
    const newData = req.body;
    await handler.post(req, res, "location", primaryKey, newData, "location");


});





module.exports = router;

