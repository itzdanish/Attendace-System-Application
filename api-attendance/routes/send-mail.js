const express = require("express")
require("express-async-errors")
const router = express.Router()
const Joi = require("joi")
const validateBody = require("../middleware/validate-body")
const { sendMail } = require("../services/mail")
const { Created } = require("../utils/success")

router.post("/", validateBody(validate), async (req, res) => {
    const newEmail = req.body;
    sendMail(newEmail.to, newEmail.subject, newEmail.content, newEmail.html)
    res.send(new Created("Your mail has been successfully sent."));
})

function validate(req) {
    const schema = Joi.object({
        to: Joi.string().email().required(),
        subject: Joi.string().allow(""),
        content: Joi.string().min(5).required(),
        html: Joi.string().allow(""),
    })
    return schema.validate(req)
}

module.exports = router
