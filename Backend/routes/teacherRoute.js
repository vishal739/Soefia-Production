const router = require('express').Router();
const teacherController = require('../controller/teacherController')
const { addTeacher, updateTeacher, fetchTeacherById, deleteTeacher } = teacherController;

router
    .post("/", addTeacher)
    .get("/:id", fetchTeacherById)
    .patch("/", updateTeacher)
    .delete("/", deleteTeacher);

module.exports = router;