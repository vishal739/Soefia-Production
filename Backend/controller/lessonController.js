const Class = require('../model/classModel');
const Lesson = require('../model/lessonModel'); // Make sure to require your Lesson model
const Teacher = require('../model/teacherModel');

// Data Format 
// const newLesson = new Lesson({
//     title: data.title,
//     date: data.date,
//     lessonMaterials: data.lessonMaterials || [],
//     lessonExercise: data.lessonExercise || [],
//     type: data.type,
//     learningGoals: data.learningGoals || "",
//     lessonSummary: data.lessonSummary || "",
//     LessonStructureOverview: data.LessonStructureOverview || "",
//     SocialCollaborationGoal: data.SocialCollaborationGoal || "",
//     status: data.status,
//     groups: data.groups || [], 
//     classId: data.classId,
//     teacherId: data.teacherId
// });

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

const updateLesson = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(400).send({
                success: false,
                message: 'Required fields are missing'
            });
        }
        if (data.date) {
            const [day, month, year] = data.date.split('/');
            data.date = new Date(`${year}-${month}-${day}`);
        }
        console.log("UpdateLessonData: ",data)
        const updateLesson = await Lesson.findOneAndUpdate({ _id: data._id }, data, { new: true }).populate({
            path: 'classId',
            select: 'name date',
        });
        if (data.type=="completed") {
            const teacher = await Teacher.findOne({ upcomingLesson: data._id });
            if(!teacher){
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
        if (data.type=="upcoming") {
            const teacher = await Teacher.findOne({ previousLesson: data._id });
            if(!teacher){
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

const deleteLesson = async (req, res) => {
    try {
        const {lessonId}= req.query;
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

const fetchCurrentLessonById = async (req, res) => {
    try {
        const { lessonId } = req.query;
        // const {date,status,classId,lessonTopic,type,title } 
        console.log("lessonId: ",lessonId)
        if (!lessonId) {
            return res.status(404).send({
                success: false,
                message: 'unable to fetch CurrentLesson'
            })
        }
        const lessonData = await Lesson.findOne({ _id: lessonId})
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
const fetchLessonByTeacherId = async (req, res) => {
    try {
        const { teacherId } = req.query;
        // const {date,status,classId,lessonTopic,type,title } 
        console.log("teacherId: ",teacherId)
        if (!teacherId) {
            return res.status(404).send({
                success: false,
                message: 'unable to fetch Lesson'
            })
        }
        const lessonData = await Lesson.find({ teacherId: teacherId}).populate({
            path: 'classId',
            select: 'name date',
        })
        // console.log("upcoming Lesson: ", upcomingLesson)
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

const updateLessonMaterials = async (req, res) => {
    try {
        const { lessonId, materials } = req.body;
        if (!lessonId || !materials) {
            return res.status(400).send({
                success: false,
                message: 'Required fields are missing'
            });
        }

        const updatedLesson = await Lesson.findByIdAndUpdate(
            lessonId,
            { $addToSet: { lessonMaterials: { $each: materials } } },
            { new: true }
        );

        res.status(200).send({
            success: true,
            message: 'Materials updated successfully',
            data: updatedLesson
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error updating materials',
            error: error.message
        });
    }
};


const updateLessonDetails = async (req, res) => {
    try {
        const { lessonId, lessonExercise, learningGoals, lessonSummary, LessonStructureOverview, SocialCollaborationGoal } = req.body;

        if (!lessonId) {
            return res.status(400).send({
                success: false,
                message: 'Lesson ID is required'
            });
        }
        
        const updateFields = {};

        if (lessonExercise) updateFields.lessonExercise = lessonExercise;
        if (learningGoals) updateFields.learningGoals = learningGoals;
        if (lessonSummary) updateFields.lessonSummary = lessonSummary;
        if (LessonStructureOverview) updateFields.LessonStructureOverview = LessonStructureOverview;
        if (SocialCollaborationGoal) updateFields.SocialCollaborationGoal = SocialCollaborationGoal;

        const updatedLesson = await Lesson.findByIdAndUpdate(
            lessonId,
            { $set: updateFields },
            { new: true }
        );

        res.status(200).send({
            success: true,
            message: 'Lesson details updated successfully',
            data: updatedLesson
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error updating lesson details',
            error: error.message
        });
    }
};



module.exports = { createLesson, fetchUpcomingLessonByTeacherId, fetchCompletedLessonByTeacherId, fetchCompletedLessonByClassId, deleteLesson, updateLesson, updateLessonMaterials, updateLessonDetails,fetchLessonByTeacherId,fetchCurrentLessonById };