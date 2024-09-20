const router = require('express').Router();
const schoolRouter= require('../controller/schoolController')
const { addSchool, updateSchool, fetchSchoolById, deleteSchool } = schoolRouter;

router
    .post("/",addSchool)
    .get("/:id",fetchSchoolById)
    .patch("/",updateSchool)
    .delete("/",deleteSchool);

module.exports= router;