const Joi = require("joi");

function validateBatch(batch, method) {
    const schemaForInsert = Joi.object({
        dept_id: Joi.string().min(2).required(),
        acad_year: Joi.string().min(7).required(),
        sem: Joi.number().required(),
        divs: Joi.string().min(1).max(1).required(),
        batch: Joi.string().min(1).max(1).required()
    });

    const schemaForUpdate = Joi.object({
        dept_id: Joi.string().min(2),
        acad_year: Joi.string().min(7),
        sem: Joi.number().required(),
        divs: Joi.string().min(1).max(1),
        batch: Joi.string().min(1).max(1)
    }).min(1);

    return method.toUpperCase() == "POST" ? schemaForInsert.validate(batch) : schemaForUpdate.validate(batch);
}

exports.validate = validateBatch;