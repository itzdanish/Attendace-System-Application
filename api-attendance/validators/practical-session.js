const Joi = require("joi");

function validatePracticalSession(practicalSession, method) {
    const schemaForInsert = Joi.object({
        course_code: Joi.string().min(1).required(),
        fac_id: Joi.string().min(2).required(),
        dept_id: Joi.string().min(2).required(),
        acad_year: Joi.string().min(7).required(),
        sem: Joi.number().required(),
        divs: Joi.string().min(1).max(1).required(),
        batch: Joi.string().min(1).max(1).required(),
        day: Joi.string().min(1).required(),
        start_time: Joi.string().min(4).required(),
        end_time: Joi.string().min(4).required(),
        lab_number: Joi.string().min(1).required(),
    });

    const schemaForUpdate = Joi.object({
        course_code: Joi.string().min(1),
        fac_id: Joi.string().min(2),
        dept_id: Joi.string().min(2),
        acad_year: Joi.string().min(7),
        sem: Joi.number().required(),
        divs: Joi.string().min(1).max(1),
        batch: Joi.string().min(1).max(1),
        day: Joi.string().min(1),
        start_time: Joi.string().min(4),
        end_time: Joi.string().min(4),
        lab_number: Joi.string().min(1)
    }).min(1);

    return method.toUpperCase() == "POST" ? schemaForInsert.validate(practicalSession) : schemaForUpdate.validate(practicalSession);
}

exports.validate = validatePracticalSession;