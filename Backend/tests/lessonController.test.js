jest.mock('../model/classModel');
jest.mock('../model/lessonModel');
jest.mock('../model/teacherModel');

const { createLesson, updateLesson, deleteLesson, fetchCurrentLessonById, fetchLessonByTeacherId, fetchUpcomingLessonByTeacherId, fetchCompletedLessonByTeacherId, fetchCompletedLessonByClassId, updateLessonMaterials, updateLessonDetails, parseLesson } =  require('../controller/lessonController');
const Lesson = require('../model/lessonModel');
const Class = require('../model/classModel');
const Teacher = require('../model/teacherModel');


describe('Lesson Controller', () => {
    let req, res;

    beforeEach(() => {
        req = { body: {}, query: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn()
        };
    });

    describe('createLesson', () => {
        it('should return 400 if required fields are missing', async () => {
            req.body = {};
            await createLesson(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({
                success: false,
                message: 'Required fields are missing. Title, classId, date, and status are required.'
            });
        });

        it('should create a lesson successfully', async () => {
            req.body = {
                title: 'Test Lesson',
                date: '01/01/2023',
                classId: 'classId',
                teacherId: 'teacherId'
            };

            Lesson.prototype.save = jest.fn().mockResolvedValue({ _id: 'lessonId' });
            Teacher.findOne = jest.fn().mockResolvedValue({ upcomingLesson: [], save: jest.fn() });
            Class.findOne = jest.fn().mockResolvedValue({ lessonsId: [], save: jest.fn() });

            await createLesson(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
                success: true,
                message: 'Lesson created successfully'
            }));
        });
    });

    describe('updateLesson', () => {
        it('should return 400 if required fields are missing', async () => {
            req.body = {};
            await updateLesson(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({
                success: false,
                message: 'Required fields are missing'
            });
        });

        it('should update a lesson successfully', async () => {
            req.body = {
                _id: 'lessonId',
                date: '01/01/2023',
                type: 'completed'
            };

            Lesson.findOneAndUpdate = jest.fn().mockResolvedValue({ _id: 'lessonId', classId: 'classId' });
            Teacher.findOne = jest.fn().mockResolvedValue({ _id: 'teacherId', upcomingLesson: [], previousLesson: [] });
            Teacher.findOneAndUpdate = jest.fn().mockResolvedValue({});

            await updateLesson(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
                success: true,
                message: 'Lesson Updated successfully'
            }));
        });
    });

    describe('deleteLesson', () => {
        it('should return 404 if lessonId is missing', async () => {
            req.query = {};
            await deleteLesson(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith({
                success: false,
                message: 'Required fields are missing'
            });
        });

        it('should delete a lesson successfully', async () => {
            req.query = { lessonId: 'lessonId' };
            Lesson.findOneAndDelete = jest.fn().mockResolvedValue({ _id: 'lessonId' });

            await deleteLesson(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
                success: true,
                message: 'delete lesson successfully'
            }));
        });
    });

    describe('fetchCurrentLessonById', () => {
        it('should return 404 if lessonId is missing', async () => {
            req.query = {};
            await fetchCurrentLessonById(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith({
                success: false,
                message: 'unable to fetch CurrentLesson'
            });
        });

        it('should fetch current lesson successfully', async () => {
            req.query = { lessonId: 'lessonId' };
            Lesson.findOne = jest.fn().mockResolvedValue({ _id: 'lessonId' });

            await fetchCurrentLessonById(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
                success: true,
                message: 'CurrentLesson fetched Succesfully'
            }));
        });
    });

    // Similar tests can be written for other functions like fetchLessonByTeacherId, fetchUpcomingLessonByTeacherId, etc.
});


// jest.config.js
module.exports = {
    testEnvironment: 'node',
};
