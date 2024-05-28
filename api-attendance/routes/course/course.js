const express = require("express");
require("express-async-errors");
const auth = require("../../middleware/auth");
const permission = require("../../middleware/permission");
const handler = require("../handler");
const router = express.Router();

const table = "course";
const resourceName = "Course";

router.get(`/:course_code`, [auth, permission], async (req, res) => {
    const id = req.params;

    await handler.get(req, res, table, id, resourceName);
});



module.exports = router;
