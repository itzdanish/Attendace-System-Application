const Joi = require('joi');
const express = require('express');
const _ = require("lodash");
const database = require("../../services/database");
const { generateAuthToken, comparePassword } = require("../../services/auth");
const validateBody = require("../../middleware/validate-body");
const { BadRequest } = require("../../utils/error");
const { OK } = require("../../utils/success");
const router = express.Router();

router.post('/', [validateBody(validate)], async (req, res) => {
    const newStudent = req.body;

    const id = _.pick(newStudent, ['roll_number']);
    let student = await database.findById("student", id);
    if (!student.length) return res.status(400).send(new BadRequest("Invalid email or password."));

    const validPassword = await comparePassword(newStudent.password, student[0].password);
    if (!validPassword) return res.status(400).send(new BadRequest("Invalid email or password."));

    const permissionString = { permission_string: "r" };
    student = { ...student[0], ...permissionString };
    student = _.omit(student, ['password']);

    const token = generateAuthToken(student);
    res.status(200).send(new OK("Valid username and password !", { token: token }));
});

function validate(req) {
    const schema = Joi.object({
        roll_number: Joi.string().min(1).required(),
        password: Joi.string().min(5).required()

    });
    return schema.validate(req);

}


module.exports = router;