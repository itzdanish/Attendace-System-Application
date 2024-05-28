const express = require("express");
require("express-async-errors");
const database = require('../../services/database');
const router = express.Router({ mergeParams: true });


router.get('/', async (req, res) => {
    const roll_number = req.params.roll_number;
    const course_code = req.params.course_code;
    const practicalSql = `SELECT pc.lab_number, pc.start_time, pc.end_time, pa.date, pa.status FROM practical_session_conducted pc JOIN practical_attendance pa ON pa.practical_session_conducted = pc.id WHERE pa.roll_number = '${roll_number}' and pc.course_code = '${course_code}'`;
    const theorySql = `SELECT tc.room_number, tc.start_time, tc.end_time, ta.date, ta.status FROM theory_session_conducted tc JOIN theory_attendance ta ON ta.theory_session_conducted = tc.id WHERE ta.roll_number = '${roll_number}' and tc.course_code = '${course_code}'`;
    const practicalLectures = await database.execute(practicalSql);
    const theoryLectures = await database.execute(theorySql);
    const allLectures = [...practicalLectures, ...theoryLectures];
    allLectures.sort(compare);
    res.send(allLectures);
});

function compare(a, b) {
    const dateA = a.date;
    const dateB = b.date;

    let comparison = 0;
    if (dateA > dateB) {
        comparison = 1;
    } else if (dateA < dateB) {
        comparison = -1;
    }
    return comparison;
}

module.exports = router;
