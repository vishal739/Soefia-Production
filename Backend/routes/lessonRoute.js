const router = require('express').Router();
const lessonController=  require("../controller/lessonController")
const { createLesson, fetchUpcomingLessonByTeacherId, fetchCompletedLessonByTeacherId,  fetchCompletedLessonByClassId ,deleteLesson,updateLesson,updateLessonMaterials,updateLessonDetails,fetchLessonByTeacherId,fetchCurrentLessonById } = lessonController;

router
    .get("/",fetchLessonByTeacherId)
    .post("/", createLesson)
    .patch("/", updateLesson)
    .delete("/", deleteLesson)
    .get("/current", fetchCurrentLessonById)
    .get("/upcoming", fetchUpcomingLessonByTeacherId)
    .get('/completed', fetchCompletedLessonByTeacherId)
    .get('/completeByClass', fetchCompletedLessonByClassId)

module.exports= router;