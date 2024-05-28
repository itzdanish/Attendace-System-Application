const express = require("express");
const _ = require("lodash");
const Joi = require("joi");
require("express-async-errors");
const database = require('../../services/database');
const auth = require("../../middleware/auth");
const permission = require("../../middleware/permission");
const handler = require("../handler");
const { BadRequest, NotFound } = require("../../utils/error");
const router = express.Router({ mergeParams: true });


router.get('/', async (req, res) => {
    const roll_number = req.params.roll_number;
    const sqlTodayTotal = `select (select count(*) from practical_session where (dept_id, acad_year, sem, divs, batch) in (select dept_id, acad_year, sem, divs, batch from active_batch where roll_number='${roll_number}') and day = dayname(curdate()) ) + (select count(*) from theory_session where (dept_id, acad_year, sem, divs) in (select dept_id, acad_year, sem, divs from active_division where roll_number='${roll_number}') and day = dayname(curdate()) ) as totalCount`
    const sqlTodayAttended = `select (select count(*) from theory_attendance where roll_number = '${roll_number}' and status = 1 and date = curdate()) + (select count(*) from practical_attendance where roll_number = '${roll_number}' and status = 1 and date = curdate()) as totalCount`;
    console.log(sqlTodayTotal);
    const total = (await database.execute(sqlTodayTotal))[0].totalCount;
    const attended = (await database.execute(sqlTodayAttended))[0].totalCount;
    const stats = [
        { title: "Total", lecture: total },
        { title: "Attend", lecture: attended },
        { title: "Remaining", lecture: total - attended },
    ];
    res.send(stats);
});

module.exports = router;
