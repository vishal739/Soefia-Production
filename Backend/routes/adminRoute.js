const router = require('express').Router();
const adminController= require('../controller/adminController')
const { addAdmin, updateAdmin, fetchAdminById, deleteAdmin } = adminController;

router
    .post("/",addAdmin)
    .get("/:id",fetchAdminById)
    .patch("/",updateAdmin)
    .delete("/",deleteAdmin);

module.exports= router;