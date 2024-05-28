const Joi = require("joi");

function validatePracticalAttendance(practicalAttendance, method) {
    const schemaForInsert = Joi.object({
        practical_session_conducted: Joi.number().min(1).required(),
        roll_number: Joi.string().min(2).required(),
        date: Joi.string().min(10).max(10).required(),
        status: Joi.boolean().required(),

    });

    const schemaForUpdate = Joi.object({
        practical_session_conducted: Joi.number().min(1),
        roll_number: Joi.string().min(2),
        date: Joi.string().min(10).max(10),
        status: Joi.boolean(),
    }).min(1);

    return method.toUpperCase() == "POST" ? schemaForInsert.validate(practicalAttendance) : schemaForUpdate.validate(practicalAttendance);
}

exports.validate = validatePracticalAttendance;