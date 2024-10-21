const router = require('express').Router();
const deitaController= require('../controller/deitaController')
const {lessonGenerator,generateLessonSummary, updateDeita,fetchDeitaById, deleteDeita} = deitaController;

 // .post("/generate",lessonGenerator)
router
    .post("/",generateLessonSummary)
    .get("/",fetchDeitaById)
    .patch("/",updateDeita)
    .delete("/",deleteDeita)
    // .post("/generate",lessonGenerator)
    

module.exports= router;