const router = require('express').Router();
const lessonController=  require("../controller/lessonController")
const { createLesson, fetchUpcomingLesson, fetchCompletedLesson }= lessonController;

router
    .post("/", createLesson)
    .get("/upcoming", fetchUpcomingLesson)
    .get('/completed', fetchCompletedLesson)

module.exports= router;