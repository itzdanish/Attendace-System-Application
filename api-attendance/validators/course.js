const Joi = require("joi");

function validateCourse(course, method) {
    const schemaForInsert = Joi.object({
        dept_id: Joi.string().min(2).required(),
        acad_year: Joi.string().min(7).required(),
        sem: Joi.number().required(),
        course_code: Joi.string().min(1).required(),
        course_name: Joi.string().min(1).required()
    });

    const schemaForUpdate = Joi.object({
        dept_id: Joi.string().min(2),
        acad_year: Joi.string().min(7),
        sem: Joi.number().required(),
        course_code: Joi.string().min(1),
        course_name: Joi.string().min(1)
    }).min(1);

    return method.toUpperCase() == "POST" ? schemaForInsert.validate(course) : schemaForUpdate.validate(course);
}

exports.validate = validateCourse;