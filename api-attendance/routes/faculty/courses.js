const express = require("express");
require("express-async-errors");
const database = require('../../services/database');
const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
    const fac_id = req.params.fac_id;
    const sql = `SELECT c.course_code, c.course_name FROM course c JOIN practical_assign p on c.course_code = p.course_code WHERE p.fac_id = '${fac_id}' UNION SELECT c.course_code, c.course_name from course c JOIN theory_assign t on c.course_code = t.course_code WHERE t.fac_id = '${fac_id}'`
    console.log(sql);
    const lectures = await database.execute(sql);
    res.send(lectures);
});

module.exports = router;
