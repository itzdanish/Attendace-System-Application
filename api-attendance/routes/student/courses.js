const express = require("express");
const _ = require("lodash");
const Joi = require("joi");
require("express-async-errors");
const database = require('../../services/database');
const auth = require("../../middleware/auth");
const permission = require("../../middleware/permission");
const handler = require("../handler");
const { BadRequest } = require("../../utils/error");
const router = express.Router({ mergeParams: true });

const id = `course_code`;

router.get('/', async (req, res) => {
    const roll_number = req.params;

    const activeDivision = await database.findById("active_division", roll_number);
    if (!activeDivision.length) res.send(new BadRequest("Course not found with given roll number."));

    const sem = _.pick(activeDivision[0], ['dept_id', 'acad_year', 'sem']);
    await handler.get(req, res, "course", sem, "Courses");

});

router.get(`/:${id}`, [auth, permission], async (req, res) => {
    const params = req.params;

    const activeDivision = await database.findById("active_division", _.pick(params, ['roll_number']));
    if (!activeDivision.length) res.send(new BadRequest("Course not found with given roll number."));

    const semAndCourse = { course_code: params.course_code, ..._.pick(activeDivision[0], ['dept_id', 'acad_year', 'sem']) };
    await handler.get(req, res, "course", semAndCourse, "Courses");

});

module.exports = router;
