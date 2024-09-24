const router = require('express').Router();
const lessonController=  require("../controller/lessonController")
const { createLesson, fetchUpcomingLessonByTeacherId, fetchCompletedLessonByTeacherId,  fetchCompletedLessonByClassId ,deleteLesson,updateLesson,updateLessonMaterials,updateLessonDetails } = lessonController;

router
    .post("/", createLesson)
    .patch("/", updateLesson)
    .delete("/", deleteLesson)
    .get("/upcoming", fetchUpcomingLessonByTeacherId)
    .get('/completed', fetchCompletedLessonByTeacherId)
    .get('/completed', fetchCompletedLessonByClassId)

module.exports= router;