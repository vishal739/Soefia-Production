const router = require('express').Router();
const teacherRouter= require('../controller/teacherController')
const { addTeacher, updateTeacher, fetchTeacherById, deleteTeacher } = teacherRouter;

router
    .post("/",addTeacher)
    .get("/:id",fetchTeacherById)
    .patch("/",updateTeacher)
    .delete("/",deleteTeacher);

module.exports= router;