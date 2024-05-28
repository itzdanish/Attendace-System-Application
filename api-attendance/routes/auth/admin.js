const Joi = require('joi');
const express = require('express');
const bcrypt = require("bcrypt");
const _ = require("lodash");
const database = require("../../services/database");
const { generateAuthToken, comparePassword } = require("../../services/auth");
const validateBody = require("../../middleware/validate-body");
const { BadRequest } = require("../../utils/error");
const { OK } = require("../../utils/success");
const router = express.Router();

const table = `admin`;
const id = `id`;
const resourceName = 'Admin';

router.post('/', [validateBody(validate)], async (req, res) => {
    const newAdmin = req.body;

    const id = _.pick(newAdmin, ['id']);
    let admin = await database.findById("admin", id);
    if (!admin.length) return res.status(400).send(new BadRequest("Invalid email or password."));

    const validPassword = await comparePassword(newAdmin.password, admin[0].password);
    if (!validPassword) return res.status(400).send(new BadRequest("Invalid email or password."));

    const permissionString = await database.getPermissionString(admin[0], `admin`);
    admin = { ...admin[0], ...permissionString[0] }
    admin = _.pick(admin, ['id', 'name', 'permission_string'])

    const token = generateAuthToken(admin);
    res.status(200).send(new OK("Valid username and password !", { token: token }));
});

function validate(req) {
    const schema = Joi.object({
        id: Joi.string().required(),
        password: Joi.string().min(5).required()

    });
    return schema.validate(req);

}


module.exports = router;