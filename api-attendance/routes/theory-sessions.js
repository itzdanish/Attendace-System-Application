const express = require("express");
require("express-async-errors");
const database = require('../services/database');
const { validate } = require("../validators/theory-session");
const auth = require("../middleware/auth");
const permission = require("../middleware/permission");
const validateBody = require("../middleware/validate-body");
const handler = require("./handler");
const router = express.Router();

const table = "theory_session";
const id = `id`;
const resourceName = "Theory session";


router.get('/', [auth, permission], async (req, res) => {
    const theorySessions = await database.find(table);
    res.send(theorySessions);
});


router.get(`/:${id}`, [auth, permission], async (req, res) => {
    const id = req.params;
    await handler.get(req, res, table, id, resourceName);
});


router.post('/', [validateBody(validate), auth, permission], async (req, res) => {
    const primaryKey = ['course_code', 'fac_id', 'dept_id', 'acad_year', 'sem', 'divs', 'day', 'start_time', 'end_time', 'room_number'];
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
