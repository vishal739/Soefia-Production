const router = require('express').Router();
const classController= require('../controller/classController')
const { addClass, updateClass, fetchClassById, deleteClass } = classController;

router
    .post("/",addClass)
    .get("/:id",fetchClassById)
    .patch("/",updateClass)
    .delete("/",deleteClass);

module.exports= router;