const express = require("express");
require("express-async-errors");
const database = require('../../services/database');
const router = express.Router({ mergeParams: true });


router.get('/', async (req, res) => {
    const fac_id = req.params.fac_id;
    const practicalSql = `SELECT c.course_code, c.course_name, p.start_time, p.fac_id, p.dept_id, p.acad_year, p.sem, p.divs, p.batch, p.day, p.start_time, p.end_time, p.lab_number from course c JOIN practical_session p on c.course_code = p.course_code WHERE p.fac_id = '${fac_id}' and  ADDTIME(p.start_time, "1:00") > CURRENT_TIME() and p.day = dayname(curdate())`;
    const theorySql = `SELECT c.course_code, c.course_name, t.start_time, t.fac_id, t.dept_id, t.acad_year, t.sem, t.divs, t.day, t.start_time, t.end_time, t.room_number from course c JOIN theory_session t on c.course_code = t.course_code WHERE t.fac_id = '${fac_id}' and  ADDTIME(t.start_time, "1:00") > CURRENT_TIME() and t.day = dayname(curdate())`;
    const practicalLectures = await database.execute(practicalSql);
    const theoryLectures = await database.execute(theorySql);
    const allLectures = [...practicalLectures, ...theoryLectures];
    allLectures.sort(compare);
    res.send(allLectures);
});

function compare(a, b) {
    const startTimeA = a.start_time.toUpperCase();
    const startTimeB = b.start_time.toUpperCase();

    let comparison = 0;
    if (startTimeA > startTimeB) {
        comparison = 1;
    } else if (startTimeA < startTimeB) {
        comparison = -1;
    }
    return comparison;
}


module.exports = router;