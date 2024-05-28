const express = require("express");
require("express-async-errors");
const database = require('../services/database');
const { validate } = require("../validators/batch");
const auth = require("../middleware/auth");
const permission = require("../middleware/permission");
const handler = require("./handler");
const router = express.Router();

const table = "college_detail";
const id = `id`;
const resourceName = "College";


router.get(`/:${id}`, [auth, permission], async (req, res) => {
    const id = req.params;
    await handler.get(req, res, table, id, resourceName);
});

module.exports = router;
