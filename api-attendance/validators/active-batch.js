const Joi = require("joi");

function validateActiveBatch(activeBatch, method) {
    const schemaForInsert = Joi.object({
        dept_id: Joi.string().min(2).required(),
        acad_year: Joi.string().min(7).required(),
        sem: Joi.number().required(),
        divs: Joi.string().min(1).max(1).required(),
        batch: Joi.string().min(1).max(1).required(),
        roll_number: Joi.string().min(2).required()
    });


    const schemaForUpdate = Joi.object({
        dept_id: Joi.string().min(2),
        acad_year: Joi.string().min(7),
        sem: Joi.number().required(),
        divs: Joi.string().min(1).max(1),
        batch: Joi.string().min(1).max(1),
        roll_number: Joi.string().min(2)
    }).min(1);

    return method.toUpperCase() == "POST" ? schemaForInsert.validate(activeBatch) : schemaForUpdate.validate(activeBatch);
}

exports.validate = validateActiveBatch;