const express = require("express");
require("express-async-errors");
const router = express.Router({ mergeParams: true });
const database = require('../../services/database');


router.get('/', async (req, res) => {
    const roll_number = req.params.roll_number;
    const practicalSql = `SELECT id as practical_session_conducted, start_time, end_time, actual_start_time, actual_end_time, day, date, batch FROM practical_session_conducted WHERE (dept_id, acad_year, sem, divs, batch) IN (SELECT dept_id, acad_year, sem, divs, batch from active_batch where roll_number='${roll_number}') and  ADDTIME(start_time, "1:00") > CURRENT_TIME() and CURRENT_TIME() <= end_time and day = dayname(curdate()) and date = CURRENT_DATE()`;
    const theorySql = `SELECT id as theory_session_conducted, start_time, end_time, actual_start_time, actual_end_time, day, date FROM theory_session_conducted WHERE (dept_id, acad_year, sem, divs) IN (SELECT dept_id, acad_year, sem, divs from active_division where roll_number='${roll_number}') and  ADDTIME(start_time, "1:00") > CURRENT_TIME() and CURRENT_TIME() <= end_time and day = dayname(curdate()) and date = CURRENT_DATE()`;
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
