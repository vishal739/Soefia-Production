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

const fetchUpcomingLesson = async (req, res) => {
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
const fetchCompletedLesson = async (req, res) => {
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
            message: 'Lesson Added Succesfully',
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



module.exports = { createLesson, fetchUpcomingLesson, fetchCompletedLesson };