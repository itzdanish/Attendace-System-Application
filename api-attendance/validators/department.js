const Joi = require("joi");

function validateDepartment(department, method) {
    const schemaForInsert = Joi.object({
        dept_id: Joi.string().min(1).required(),
        dept_name: Joi.string().min(4).required(),
    });

    const schemaForUpdate = Joi.object({
        dept_id: Joi.string().min(1),
        dept_name: Joi.string().min(4)
    }).min(1);

    return method.toUpperCase() == "POST" ? schemaForInsert.validate(department) : schemaForUpdate.validate(department);
}

exports.validate = validateDepartment;