const Joi = require("joi");

function validateAdmin(admin, method) {
    const schemaForInsert = Joi.object({
        name: Joi.string().min(5).required(),
        email: Joi.string().email().required(),
        mobile: Joi.string().min(10).required(),
        password: Joi.string().min(5).required(),
        role_id: Joi.string().min(1).required(),
    });

    const schemaForUpdate = Joi.object({
        name: Joi.string().min(5),
        email: Joi.string().email(),
        mobile: Joi.string().min(10),
        password: Joi.string().min(5),
        role_id: Joi.string().min(1)
    }).min(1);

    return method.toUpperCase() == "POST" ? schemaForInsert.validate(admin) : schemaForUpdate.validate(admin);
}

exports.validate = validateAdmin;