const router = require('express').Router();
const studentRouter= require('../controller/studentController')
const { addStudent, updateStudent, fetchStudentByID,fetchStudentByClass, deleteStudent } = studentRouter;

router
    .post("/",addStudent)
    .get("/:id",fetchStudentByID)
    .get("/:class",fetchStudentByClass)
    .patch("/",updateStudent)
    .delete("/",deleteStudent);

module.exports= router;