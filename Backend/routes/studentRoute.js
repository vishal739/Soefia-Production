const router = require('express').Router();
const studentController= require('../controller/studentController')
const { addStudent, updateStudent, fetchStudentById,fetchStudentByClass, deleteStudent } = studentController;

router
    .post("/",addStudent)
    .get("/:id",fetchStudentById)
    .get("/:class",fetchStudentByClass)
    .patch("/",updateStudent)
    .delete("/",deleteStudent);

module.exports= router;