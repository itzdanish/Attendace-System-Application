const Joi = require("joi");

function validatePracticalSessionConducted(practicalSessionConducted, method) {
    const schemaForInsert = Joi.object({
        course_code: Joi.string().min(1).required(),
        fac_id: Joi.string().min(2).required(),
        dept_id: Joi.string().min(2).required(),
        acad_year: Joi.string().min(7).required(),
        sem: Joi.number().required(),
        divs: Joi.string().min(1).max(1).required(),
        batch: Joi.string().min(1).max(1).required(),
        day: Joi.string().min(1).required(),
        start_time: Joi.string().min(8).required(),
        end_time: Joi.string().min(8).required(),
        lab_number: Joi.string().min(1).required(),
        actual_start_time: Joi.string().allow(''),
        actual_end_time: Joi.string().allow(''),
        cond_by_fac: Joi.string().allow(''),
        cond_in_lab: Joi.string().allow(''),
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
        start_time: Joi.string().min(8),
        end_time: Joi.string().min(8),
        lab_number: Joi.string().min(1),
        actual_start_time: Joi.string().allow(''),
        actual_end_time: Joi.string().allow(''),
        cond_by_fac: Joi.string().allow(''),
        cond_in_lab: Joi.string().allow('')
    }).min(1);

    return method.toUpperCase() == "POST" ? schemaForInsert.validate(practicalSessionConducted) : schemaForUpdate.validate(practicalSessionConducted);
}

exports.validate = validatePracticalSessionConducted;