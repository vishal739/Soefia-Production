const router = require('express').Router();
const deitaController= require('../controller/deitaController')
const { generateLessonSummary, updateDeita,fetchDeitaById, deleteDeita } = deitaController;
+
router
    .post("/",generateLessonSummary)
    .get("/",fetchDeitaById)
    .patch("/",updateDeita)
    .delete("/",deleteDeita);

module.exports= router;