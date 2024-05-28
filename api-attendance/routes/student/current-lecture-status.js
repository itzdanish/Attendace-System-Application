const express = require("express");
require("express-async-errors");
const router = express.Router({ mergeParams: true });
const database = require('../../services/database');


router.get('/', async (req, res) => {
    const roll_number = req.params.roll_number;
    const practicalSql = `SELECT id as practical_session_conducted FROM practical_session_conducted WHERE (dept_id, acad_year, sem, divs, batch) IN (SELECT dept_id, acad_year, sem, divs, batch from active_batch where roll_number='${roll_number}') and  ADDTIME(start_time, "1:00") > CURRENT_TIME() and CURRENT_TIME() <= end_time and day = dayname(curdate()) and date = CURRENT_DATE()`;
    const theorySql = `SELECT id as theory_session_conducted FROM theory_session_conducted WHERE (dept_id, acad_year, sem, divs) IN (SELECT dept_id, acad_year, sem, divs from active_division where roll_number='${roll_number}') and  ADDTIME(start_time, "1:00") > CURRENT_TIME() and CURRENT_TIME() <= end_time and day = dayname(curdate()) and date = CURRENT_DATE()`;
    const practicalLectures = await database.execute(practicalSql);
    const theoryLectures = await database.execute(theorySql);
    const allLectures = [...practicalLectures, ...theoryLectures];
    allLectures.sort(compare);
    const id = allLectures.length ? allLectures[0] : null;
    if (id && id.theory_session_conducted) {
        const query = `SELECT status FROM theory_attendance WHERE theory_session_conducted = ${id.theory_session_conducted} AND roll_number = '${roll_number}'`;
        const status = await database.execute(query);
        return res.send(status[0]);
    }
    else if (id && id.practical_session_conducted) {
        const query = `SELECT status FROM practical_attendance WHERE practical_session_conducted = ${id.practical_session_conducted} AND roll_number = '${roll_number}'`;
        const status = await database.execute(query);
        return res.send(status[0]);
    }
    res.send([]);
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
