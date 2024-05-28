const Joi = require("joi");

function validateSemester(semester, method) {
    const schemaForInsert = Joi.object({
        dept_id: Joi.string().min(2).required(),
        acad_year: Joi.string().min(7).required(),
        sem: Joi.number().required()
    });

    const schemaForUpdate = Joi.object({
        dept_id: Joi.string().min(2),
        acad_year: Joi.string().min(7),
        sem: Joi.number().required()
    }).min(1);

    return method.toUpperCase() == "POST" ? schemaForInsert.validate(semester) : schemaForUpdate.validate(semester);
}

exports.validate = validateSemester;