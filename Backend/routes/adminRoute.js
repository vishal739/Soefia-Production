const router = require('express').Router();
const adminRouter= require('../controller/adminController')
const { addAdmin, updateAdmin, fetchAdminById, deleteAdmin } = adminRouter;

router
    .post("/",addAdmin)
    .get("/:id",fetchAdminById)
    .patch("/",updateAdmin)
    .delete("/",deleteAdmin);

module.exports= router;