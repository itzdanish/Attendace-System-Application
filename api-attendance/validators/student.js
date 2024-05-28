const Joi = require("joi");

function validateStudent(student, method) {
    const schemaForInsert = Joi.object({
        roll_number: Joi.string().min(2).required(),
        name: Joi.string().min(5).required(),
        encoding: Joi.string().min(1).required(),
        dept_id: Joi.string().min(2).required(),
        password: Joi.string().min(5).required()
    });

    const schemaForUpdate = Joi.object({
        roll_number: Joi.string().min(2),
        name: Joi.string().min(5),
        encoding: Joi.string().min(1),
        dept_id: Joi.string().min(2),
        password: Joi.string().min(5)
    }).min(1);

    return method.toUpperCase() == "POST" ? schemaForInsert.validate(student) : schemaForUpdate.validate(student);
}

exports.validate = validateStudent;