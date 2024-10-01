const router = require('express').Router();
const deitaController= require('../controller/deitaController')
const { addDeita, updateDeita,fetchDeitaById, deleteDeita } = deitaController;

router
    .post("/",addDeita)
    .get("/",fetchDeitaById)
    .patch("/",updateDeita)
    .delete("/",deleteDeita);

module.exports= router;