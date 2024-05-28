const Joi = require("joi");

function validateTheorySessionConducted(theorySessionConducted, method) {
    const schemaForInsert = Joi.object({
        course_code: Joi.string().min(1).required(),
        fac_id: Joi.string().min(2).required(),
        dept_id: Joi.string().min(2).required(),
        acad_year: Joi.string().min(7).required(),
        sem: Joi.number().required(),
        divs: Joi.string().min(1).max(1).required(),
        day: Joi.string().min(1).required(),
        start_time: Joi.string().min(8).required(),
        end_time: Joi.string().min(8).required(),
        room_number: Joi.string().min(1).required(),
        actual_start_time: Joi.string().allow(''),
        actual_end_time: Joi.string().allow(''),
        cond_by_fac: Joi.string().allow(''),
        cond_in_room: Joi.string().allow(''),
    }).min(10);

    const schemaForUpdate = Joi.object({
        course_code: Joi.string().min(1),
        fac_id: Joi.string().min(2),
        dept_id: Joi.string().min(2),
        acad_year: Joi.string().min(7),
        sem: Joi.number().required(),
        divs: Joi.number().min(1).max(1),
        day: Joi.string().min(1),
        start_time: Joi.string().min(8),
        end_time: Joi.string().min(8),
        room_number: Joi.string().min(1),
        actual_start_time: Joi.string().allow(''),
        actual_end_time: Joi.string().allow(''),
        cond_by_fac: Joi.string().allow(''),
        cond_in_room: Joi.string().allow(''),
    }).min(1);

    return method.toUpperCase() == "POST" ? schemaForInsert.validate(theorySessionConducted) : schemaForUpdate.validate(theorySessionConducted);
}

exports.validate = validateTheorySessionConducted;