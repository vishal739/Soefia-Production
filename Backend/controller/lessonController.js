const Class = require('../model/classModel');
const Lesson = require('../model/lessonModel'); // Make sure to require your Lesson model
const Teacher = require('../model/teacherModel');

/**
 * Creates a new lesson and saves it to the database.
 * 
 * @async
 * @function createLesson
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request containing lesson details.
 * @param {string} req.body.title - The title of the lesson.
 * @param {string} req.body.classId - The ID of the class.
 * @param {string} req.body.date - The date of the lesson in DD/MM/YYYY format.
 * @param {string} req.body.teacherId - The ID of the teacher.
 * @param {Array} [req.body.lessonMaterials] - The materials for the lesson.
 * @param {Array} [req.body.lessonExercise] - The exercises for the lesson.
 * @param {string} [req.body.type] - The type of the lesson.
 * @param {string} [req.body.learningGoals] - The learning goals of the lesson.
 * @param {string} [req.body.lessonSummary] - The summary of the lesson.
 * @param {string} [req.body.lessonStructureOverview] - The structure overview of the lesson.
 * @param {string} [req.body.socialCollaborationGoal] - The social collaboration goal of the lesson.
 * @param {string} [req.body.status] - The status of the lesson.
 * @param {Array} [req.body.groups] - The groups associated with the lesson.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the lesson is created.
 * @throws {Error} - If there is an error creating the lesson.
 */
const createLesson = async (req, res) => {
    try {
        const data = req.body;

        if (!data || !data.title || !data.classId || !data.date || !data.teacherId) {
            return res.status(400).send({
                success: false,
                message: 'Required fields are missing. Title, classId, date, and status are required.'
            });
        }
        if (data.date) {
            const [day, month, year] = data.date.split('/');
            data.date = new Date(`${year}-${month}-${day}`);
        }
        const newLesson = new Lesson({
            title: data.title,
            date: data.date,
            lessonMaterials: data.lessonMaterials || [],
            lessonExercise: data.lessonExercise || [],
            type: data.type,
            learningGoals: data.learningGoals || "",
            lessonSummary: data.lessonSummary || "",
            lessonStructureOverview: data.lessonStructureOverview || "",
            socialCollaborationGoal: data.socialCollaborationGoal || "",
            status: data.status,
            groups: data.groups || [],
            classId: data.classId,
            teacherId: data.teacherId
        });

        const savedLesson = await newLesson.save();
        //If Lesson is saved, add the lesson to the teacher's upcomingLesson array and Class LessonId array
        if (savedLesson) {
            const teacher = await Teacher.findOne({ _id: data.teacherId });
            teacher.upcomingLesson.push(savedLesson._id);
            teacher.save();
        }
        if (savedLesson) {
            const classObject = await Class.findOne({ _id: data.classId });
            classObject.lessonsId.push(savedLesson._id);
            classObject.save();
        }
        console.log(savedLesson);
        res.status(201).send({
            success: true,
            message: 'Lesson created successfully',
            data: savedLesson
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error creating the lesson',
            error: error.message
        });
    }
};



/**
 * Updates a lesson based on the provided data in the request body.
 * 
 * @async
 * @function updateLesson
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request containing lesson data.
 * @param {string} req.body._id - The ID of the lesson to update.
 * @param {string} req.body.date - The date of the lesson in DD/MM/YYYY format.
 * @param {string} req.body.type - The type of the lesson, either "completed" or "upcoming".
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Sends a response with the status of the update operation.
 * 
 * @throws {Error} If there is an error during the update process.
 */
const updateLesson = async (req, res) => {
    try {
        const data = req.body;
        if (!data || !data._id || !data.date) {
            return res.status(400).send({
                success: false,
                message: 'Required fields are missing'
            });
        }
        if (data.date) {
            const [day, month, year] = data.date.split('/');
            data.date = new Date(`${year}-${month}-${day}`);
        }
        console.log("UpdateLessonData: ", data)
        const updateLesson = await Lesson.findOneAndUpdate({ _id: data._id }, data, { new: true })
        //when someone marks a lesson as completed we will update teacher upcomingLesson array and add the lesson to the previousLesson array
        if (data.type == "completed") {
            const teacher = await Teacher.findOne({ upcomingLesson: data._id });
            if (!teacher) {
                return res.status(404).send({
                    success: false,
                    message: 'teacher not found using upcoming lesson in updateLessonAPI'
                });
            }
            await Teacher.findOneAndUpdate(
                { _id: teacher._id },
                {
                    $pull: { upcomingLesson: data._id },
                    $push: { previousLesson: data._id }
                },
                { new: true }
            );
        }
        //when someone marks a lesson as upcoming we will update teacher previousLesson array and add the lesson to the upcomingLesson array
        if (data.type == "upcoming") {
            const teacher = await Teacher.findOne({ previousLesson: data._id });
            if (!teacher) {
                return res.status(404).send({
                    success: false,
                    message: 'teacher not found using previous lesson in updateLessonAPI'
                });
            }
            await Teacher.findOneAndUpdate(
                { _id: teacher._id },
                {
                    $push: { upcomingLesson: data._id },
                    $pull: { previousLesson: data._id }
                },
                { new: true }
            );
        }
        res.status(201).send({
            success: true,
            message: 'Lesson Updated successfully',
            data: updateLesson
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error update Lesson',
            error: error.message
        });
    }
}

/**
 * Deletes a lesson based on the provided lessonId.
 *
 * @async
 * @function deleteLesson
 * @param {Object} req - The request object.
 * @param {Object} req.query - The query parameters.
 * @param {string} req.query.lessonId - The ID of the lesson to delete.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Sends a response indicating the success or failure of the deletion operation.
 */
const deleteLesson = async (req, res) => {
    try {
        const { lessonId } = req.query;
        if (!lessonId) {
            return res.status(404).send({
                success: false,
                message: 'Required fields are missing'
            })
        }
        const lesson = await Lesson.findOneAndDelete({ _id: lessonId });
        return res.status(200).send({
            success: true,
            message: 'delete lesson successfully',
            data: lesson
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in deletelesson API',
            error
        })
    }
}

/**
 * Fetches the current lesson by its ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.query - The query parameters.
 * @param {string} req.query.lessonId - The ID of the lesson to fetch.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - Sends a response with the lesson data or an error message.
 */
const fetchCurrentLessonById = async (req, res) => {
    try {
        const { lessonId } = req.query;
        // const {date,status,classId,lessonTopic,type,title } 
        console.log("lessonId: ", lessonId)
        if (!lessonId) {
            return res.status(404).send({
                success: false,
                message: 'unable to fetch CurrentLesson'
            })
        }
        const lessonData = await Lesson.findOne({ _id: lessonId })
        // console.log("upcoming Lesson: ", upcomingLesson)
        res.status(200).send({
            success: true,
            message: 'CurrentLesson fetched Succesfully',
            data: lessonData,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in fetchCurrentLesson API',
            error
        })
    }
}

/**
 * Fetches lessons by teacher ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.query - The query parameters.
 * @param {string} req.query.teacherId - The ID of the teacher.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - Sends a response with the lesson data or an error message.
 */

const fetchLessonByTeacherId = async (req, res) => {
    try {
        const { teacherId } = req.query;
        // const {date,status,classId,lessonTopic,type,title } 
        console.log("teacherId: ", teacherId)
        if (!teacherId) {
            return res.status(404).send({
                success: false,
                message: 'unable to fetch Lesson'
            })
        }
        const lessonData = await Lesson.find({ teacherId: teacherId }).populate({
            path: 'classId',
            select: 'name date',
        })
        // console.log("Lesson: ", lessonData)
        res.status(200).send({
            success: true,
            message: 'Lesson fetched Succesfully',
            data: lessonData,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in fetchLesson API',
            error
        })
    }
}

/**
 * Fetches upcoming lessons by teacher ID.
 *
 * @async
 * @function fetchUpcomingLessonByTeacherId
 * @param {Object} req - The request object.
 * @param {Object} req.query - The query parameters.
 * @param {string} req.query.teacherId - The ID of the teacher.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Sends a response with the upcoming lessons or an error message.
 * @throws {Error} If there is an error during the fetch operation.
 */
const fetchUpcomingLessonByTeacherId = async (req, res) => {
    try {
        const { teacherId } = req.query;
        // const {date,status,classId,lessonTopic,type,title } 
        if (!teacherId) {
            return res.status(404).send({
                success: false,
                message: 'unable to fetch Lesson'
            })
        }
        const upcomingLesson = await Lesson.find({ teacherId: teacherId, type: "upcoming" }).populate('classId')
        // console.log("upcoming Lesson: ", upcomingLesson)
        res.status(200).send({
            success: true,
            message: 'Lesson Added Succesfully',
            data: upcomingLesson,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in fetchUpComingLesson API',
            error
        })
    }
}

/**
 * Fetches completed lessons by teacher ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.query - The query parameters.
 * @param {string} req.query.teacherId - The ID of the teacher.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 *
 * @throws {Error} - If there is an error during the operation.
 */
const fetchCompletedLessonByTeacherId = async (req, res) => {
    try {
        const { teacherId } = req.query;
        // const {date,status,classId,lessonTopic,type,title } 
        if (!teacherId) {
            return res.status(404).send({
                success: false,
                message: 'unable to fetch Lesson'
            })
        }
        const completedLesson = await Lesson.find({ teacherId: teacherId, type: "completed" }).populate('classId')
        res.status(200).send({
            success: true,
            message: 'Lesson Fetched Succesfully',
            data: completedLesson,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in fetchCompletedLesson API',
            error
        })
    }
}

/**
 * Fetches completed lessons by class ID and teacher ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.query - The query parameters.
 * @param {string} req.query.teacherId - The ID of the teacher.
 * @param {string} req.query.classId - The ID of the class.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - Sends a response with the fetched lessons or an error message.
 */
const fetchCompletedLessonByClassId = async (req, res) => {
    try {
        const { teacherId, classId } = req.query;
        // const {date,status,classId,lessonTopic,type,title } 
        console.log(teacherId, classId);
        if (!teacherId || !classId) {
            return res.status(404).send({
                success: false,
                message: 'unable to fetch Lesson'
            })
        }
        const completedLesson = await Lesson.find({ classId: classId, teacherId: teacherId, type: "completed" }).populate('classId')
        console.log("classLesson: ", completedLesson)
        res.status(200).send({
            success: true,
            message: 'Lesson Fetched Succesfully',
            data: completedLesson,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in fetchCompletedLesson API',
            error
        })
    }
}


module.exports = { createLesson, fetchUpcomingLessonByTeacherId, fetchCompletedLessonByTeacherId, fetchCompletedLessonByClassId, deleteLesson, updateLesson, fetchLessonByTeacherId, fetchCurrentLessonById };