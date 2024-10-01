const router = require('express').Router();
const schoolController= require('../controller/schoolController')
const { addSchool, updateSchool, fetchSchoolById, deleteSchool } = schoolController;

router
    .post("/",addSchool)
    .get("/:id",fetchSchoolById)
    .patch("/",updateSchool)
    .delete("/",deleteSchool);

module.exports= router;