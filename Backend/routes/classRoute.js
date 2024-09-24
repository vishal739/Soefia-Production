const classRouter= require('../controller/classController')
const { addClass, updateClass, fetchClassById, deleteClass } = classRouter;

router
    .post("/",addClass)
    .get("/:id",fetchClassById)
    .patch("/",updateClass)
    .delete("/",deleteClass);

module.exports= router;