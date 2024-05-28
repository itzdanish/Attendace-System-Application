const express = require("express");
const auth = require("../../middleware/auth");
const permission = require("../../middleware/permission");
require("express-async-errors");
const database = require('../../services/database');
const router = express.Router({ mergeParams: true });

router.get('/', [auth, permission], async (req, res) => {
    const course_code = req.params.course_code;
    console.log(course_code);
    const studentPracticalSql = `SELECT s.name, s.email, s.roll_number, sc.course_code, sc.dept_id, sc.sem, sc.divs, sc.batch from student s JOIN (SELECT pa.course_code, ab.roll_number, ab.dept_id, ab.sem, ab.divs, ab.batch from practical_assign pa JOIN active_batch ab ON (pa.dept_id, pa.acad_year, pa.sem, pa.divs, pa.batch) = (ab.dept_id, ab.acad_year, ab.sem, ab.divs, ab.batch) where pa.course_code = '${course_code}') sc ON s.roll_number = sc.roll_number`;
    const studentTheorySql = `SELECT s.name, s.email, s.roll_number, sc.course_code, sc.dept_id, sc.sem, sc.divs from student s JOIN (SELECT ta.course_code, ad.roll_number, ad.dept_id, ad.sem, ad.divs from theory_assign ta JOIN active_division ad ON (ta.dept_id, ta.acad_year, ta.sem, ta.divs) = (ad.dept_id, ad.acad_year, ad.sem, ad.divs) where ta.course_code = '${course_code}') sc ON s.roll_number = sc.roll_number`;
    const practicalStudents = await database.execute(studentPracticalSql);
    const theoryStudents = await database.execute(studentTheorySql);
    const students = practicalStudents.length ? practicalStudents : theoryStudents;
    res.send(students);
});

module.exports = router;
