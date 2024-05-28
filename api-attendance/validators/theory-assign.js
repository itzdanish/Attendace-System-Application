const Joi = require("joi");

function validateTheroyAssign(theoryAssign, method) {
    const schemaForInsert = Joi.object({
        course_code: Joi.string().min(1).required(),
        fac_id: Joi.string().min(2).required(),
        dept_id: Joi.string().min(2).required(),
        acad_year: Joi.string().min(7).required(),
        sem: Joi.number().required(),
        divs: Joi.string().min(1).max(1).required(),
    });

    const schemaForUpdate = Joi.object({
        course_code: Joi.string().min(1),
        fac_id: Joi.string().min(2),
        dept_id: Joi.string().min(2),
        acad_year: Joi.string().min(7),
        sem: Joi.number().required(),
        divs: Joi.string().min(1).max(1)
    }).min(1);

    return method.toUpperCase() == "POST" ? schemaForInsert.validate(theoryAssign) : schemaForUpdate.validate(theoryAssign);
}

exports.validate = validateTheroyAssign;