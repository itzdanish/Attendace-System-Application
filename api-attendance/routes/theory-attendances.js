const express = require("express");
require("express-async-errors");
const database = require('../services/database');
const { validate } = require("../validators/theory-attendance");
const auth = require("../middleware/auth");
const permission = require("../middleware/permission");
const validateBody = require("../middleware/validate-body");
const handler = require("./handler");
const router = express.Router();

const table = "theory_attendance";
const id = `id`;
const resourceName = `Theory Attendance`;

router.get('/', [auth, permission], async (req, res) => {
    const activeBatches = await database.find(table);
    res.send(activeBatches);
});


router.get(`/:${id}`, [auth, permission], async (req, res) => {
    const id = req.params;
    await handler.get(req, res, table, id, resourceName);
});


router.post('/', [validateBody(validate), auth, permission], async (req, res) => {
    const newData = req.body;
    const primaryKey = ['theory_attendance_conducted', 'roll_number', 'date'];
    await handler.post(req, res, table, primaryKey, newData, resourceName);
});

router.put(`/:${id}/multiple`, [auth, permission], async (req, res) => {

    const { roll_number } = req.body;
    var quotedAndCommaSeparated = "'" + roll_number.join("','") + "'";
    const query = `UPDATE theory_attendance SET status = 1 WHERE theory_session_conducted = ${req.params.id} AND roll_number IN (${quotedAndCommaSeparated})`;
    console.log(query);
    const data = await database.execute(query);
    res.send(data);
});

router.put(`/:${id}`, [validateBody(validate), auth, permission], async (req, res) => {
    const id = req.params;
    const updates = req.body;
    await handler.put(req, res, table, id, updates, resourceName);
});

router.put(`/`, [auth, permission], async (req, res) => {
    const { theory_session_conducted, status, date, roll_number } = req.body;
    await handler.put(req, res, table, { theory_session_conducted, date, roll_number }, { status }, resourceName);
});

router.delete(`/:${id}`, [auth, permission], async (req, res) => {
    const id = req.params;

    await handler.delete(req, res, table, id, resourceName);
});

module.exports = router;
