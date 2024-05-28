const express = require("express");
const auth = require("../../middleware/auth");
const permission = require("../../middleware/permission");
require("express-async-errors");
const database = require('../../services/database');
const router = express.Router({ mergeParams: true });


router.get('/', [auth, permission], async (req, res) => {
    const roll_number = req.params.roll_number;
    const course_code = req.params.course_code;

    const sqlTotal = `select (select count(*) from practical_session_conducted where (dept_id, acad_year, sem, divs, batch) in (select dept_id, acad_year, sem, divs, batch from active_batch where roll_number='${roll_number}' and course_code = '${course_code}')) + (select count(*) from theory_session_conducted where (dept_id, acad_year, sem, divs) in (select dept_id, acad_year, sem, divs from active_division where roll_number='${roll_number}' and course_code = '${course_code}')) as total_conducted`
    const sqlAttended = `SELECT (SELECT COUNT(*) FROM practical_session_conducted pc JOIN practical_attendance pa ON pa.practical_session_conducted = pc.id WHERE pa.roll_number = '${roll_number}' and pc.course_code = '${course_code}' and pa.status = 1) + (SELECT COUNT(*) FROM theory_session_conducted tc JOIN theory_attendance ta ON ta.theory_session_conducted = tc.id WHERE ta.roll_number = '${roll_number}' and tc.course_code = '${course_code}' and ta.status = 1) as total_attended`;
    const total_attended = (await database.execute(sqlTotal));
    const total_conducted = (await database.execute(sqlAttended));
    const stats = [
        ...total_attended,
        ...total_conducted
    ];

    res.send(stats);
});

module.exports = router;
