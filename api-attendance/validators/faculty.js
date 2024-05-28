const Joi = require("joi");

function validateFaculty(faculty, method) {
    const schemaForInsert = Joi.object({
        fac_id: Joi.string().min(2).required(),
        fac_name: Joi.string().min(5).required(),
        dept_id: Joi.string().min(2).required(),
        password: Joi.string().min(5).required()

    });

    const schemaForUpdate = Joi.object({
        fac_id: Joi.string().min(2),
        fac_name: Joi.string().min(5),
        dept_id: Joi.string().min(2),
        password: Joi.string().min(5)
    }).min(1);

    return method.toUpperCase() == "POST" ? schemaForInsert.validate(faculty) : schemaForUpdate.validate(faculty);
}

exports.validate = validateFaculty;