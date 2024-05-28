const Joi = require("joi");

function validateAcademicYear(academicYear, method) {
    const schemaForInsert = Joi.object({
        dept_id: Joi.string().min(2).required(),
        acad_year: Joi.string().min(7).required(),
    });

    const schemaForUpdate = Joi.object({
        dept_id: Joi.string().min(2),
        acad_year: Joi.string().min(7),
    }).min(1);
    return method.toUpperCase() == "POST" ? schemaForInsert.validate(academicYear) : schemaForUpdate.validate(academicYear);
}


exports.validate = validateAcademicYear;