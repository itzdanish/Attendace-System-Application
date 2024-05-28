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
    const newFaculty = req.body;

    const id = _.pick(newFaculty, ['fac_id']);
    let faculty = await database.findById("faculty", id);
    if (!faculty.length) return res.status(400).send(new BadRequest("Invalid email or password."));

    const validPassword = await comparePassword(newFaculty.password, faculty[0].password);
    if (!validPassword) return res.status(400).send(new BadRequest("Invalid email or password."));

    const permissionString = { permission_string: "crud" };
    faculty = { ...faculty[0], ...permissionString, is_faculty: true };
    faculty = _.omit(faculty, ['password']);

    const token = generateAuthToken(faculty);
    res.status(200).send(new OK("Valid username and password !", { token: token }));
});

function validate(req) {
    const schema = Joi.object({
        fac_id: Joi.string().min(1).required(),
        password: Joi.string().min(5).required()

    });
    return schema.validate(req);

}


module.exports = router;