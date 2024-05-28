const express = require("express");
require("express-async-errors");
const database = require('../services/database');
const { generatePassword } = require('../services/auth');
const { validate } = require("../validators/admin");
const auth = require("../middleware/auth");
const permission = require("../middleware/permission");
const validateBody = require("../middleware/validate-body");
const handler = require("./handler");
const router = express.Router();

const table = "admin";
const id = `id`;
const resourceName = `admin`;

router.get('/', [auth, permission], async (req, res) => {
    const admin = await database.find(table);
    res.send(admin);
});


router.get(`/:${id}`, [auth, permission], async (req, res) => {
    const id = req.params;
    await handler.get(req, res, table, id, resourceName);
});


router.post('/', [validateBody(validate), auth, permission], async (req, res) => {
    const newData = req.body;
    newData.password = await generatePassword(newData.password);
    const primaryKey = ['email'];
    await handler.post(req, res, table, primaryKey, newData, resourceName);
});


router.put(`/:${id}`, [validateBody(validate), auth, permission], async (req, res) => {
    const id = req.params;
    const updates = req.body;
    updates.password = await generatePassword(updates.password);
    await handler.put(req, res, table, id, updates, resourceName);
});

router.delete(`/:${id}`, [auth, permission], async (req, res) => {
    const id = req.params;

    await handler.delete(req, res, table, id, resourceName);
});

module.exports = router;
