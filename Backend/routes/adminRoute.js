const router = require('express').Router();
const adminRouter= require('../controller/adminController')
const {addAdmin} = adminRouter;

router.post("/",addAdmin);

module.exports= router;