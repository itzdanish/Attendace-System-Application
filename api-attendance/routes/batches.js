const express = require("express");
require("express-async-errors");
const database = require('../services/database');
const { validate } = require("../validators/batch");
const auth = require("../middleware/auth");
const permission = require("../middleware/permission");
const validateBody = require("../middleware/validate-body");
const handler = require("./handler");
const router = express.Router();

const table = "batch";
const id = `id`;
const resourceName = "Batch";


router.get('/', [auth, permission], async (req, res) => {
    const batches = await database.find(table);
    res.send(batches);
});

router.get(`/:${id}`, [auth, permission], async (req, res) => {
    const id = req.params;
    await handler.get(req, res, table, id, resourceName);
});


router.post('/', [validateBody(validate), auth, permission], async (req, res) => {
    const primaryKey = ['dept_id', 'acad_year', 'sem', 'divs', 'batch'];
    const newData = req.body;
    await handler.post(req, res, table, primaryKey, newData, resourceName);
});


router.put(`/:${id}`, [validateBody(validate), auth, permission], async (req, res) => {
    const id = req.params;
    const updates = req.body;
    await handler.put(req, res, table, id, updates, resourceName);
});


router.delete(`/:${id}`, [auth, permission], async (req, res) => {
    const id = req.params;
    await handler.delete(req, res, table, id, resourceName);
});
module.exports = router;
