const router = require('express').Router();
const studentRouter= require('../controller/studentController')
const { addStudent, updateStudent, fetchStudentById,fetchStudentByClass, deleteStudent } = studentRouter;

router
    .post("/",addStudent)
    .get("/:id",fetchStudentById)
    .get("/:class",fetchStudentByClass)
    .patch("/",updateStudent)
    .delete("/",deleteStudent);

module.exports= router;