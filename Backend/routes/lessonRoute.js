const router = require('express').Router();
const lessonController=  require("../controller/lessonController")
const { createLesson, fetchUpcomingLesson, fetchCompletedLesson, deleteLesson,updateLesson } = lessonController;

router
    .post("/", createLesson)
    .patch("/", updateLesson)
    .delete("/", deleteLesson)
    .get("/upcoming", fetchUpcomingLesson)
    .get('/completed', fetchCompletedLesson)

module.exports= router;