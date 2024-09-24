const Lesson = require('../model/lessonModel'); // Make sure to require your Lesson model

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

        // Validate the incoming request
        if (!data || !data.title || !data.classId || !data.date || !data.status || !data.type || !data.teacherId) {
            return res.status(400).send({
                success: false,
                message: 'Required fields are missing. Title, classId, date, and status are required.'
            });
        }

        const newLesson = new Lesson({
            title: data.title,
            date: data.date,
            lessonMaterials: data.lessonMaterials || [],
            lessonExercise: data.lessonExercise || [],
            type: data.type,
            learningGoals: data.learningGoals || "",
            lessonSummary: data.lessonSummary || "",
            LessonStructureOverview: data.LessonStructureOverview || "",
            SocialCollaborationGoal: data.SocialCollaborationGoal || "",
            status: data.status,
            groups: data.groups || [], 
            classId: data.classId,
            teacherId: data.teacherId
        });

       
        const savedLesson = await newLesson.save();

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

        const updateLesson = await Lesson.findOneAndUpdate({ _id: id }, data, { new: true });

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
        const data = req.body;
        if (!data || !data.id) {
            return res.status(404).send({
                success: false,
                message: 'Required fields are missing'
            })
        }
        const lesson =await Lesson.findOneAndDelete({ _id: data.id });
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
        const upcomingLesson= await Lesson.find({teacherId: teacherId,type: "upcoming"})
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
        const completedLesson= await Lesson.find({teacherId: teacherId,type: "Completed"})
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
        const { teacherId,classId } = req.query; 
        // const {date,status,classId,lessonTopic,type,title } 
        if (!teacherId || classId) {
            return res.status(404).send({
                success: false,
                message: 'unable to fetch Lesson'
            })
        }
        const completedLesson= await Lesson.find({classId: classId, teacherId: teacherId,type: "Completed"})
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



module.exports = { createLesson, fetchUpcomingLessonByTeacherId, fetchCompletedLessonByTeacherId,  fetchCompletedLessonByClassId ,deleteLesson,updateLesson,updateLessonMaterials,updateLessonDetails };