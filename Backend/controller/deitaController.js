const Deita = require("../model/deitaModel")
const Lesson = require("../model/lessonModel");
const { fetchResponse } = require("../utils/openai");


const generateLessonSummary = async (req, res) => {
    try {
        const data = req.body;
        if (!data || !data.lessonId) {
            return res.status(400).send({
                success: false,
                message: 'Required fields are missing'
            });
        }
        
        const lesson = await Lesson.findOne({ _id: data.lessonId });

        if (!lesson) {
            return res.status(404).send({
                success: false,
                message: 'lesson not found in addDeita Api'
            });
        }
        //REST
        const deitaCheck = await Deita.findOne({ lessonId: data.lessonId });

        const deitaObject = {
            content: "generate the fields of whatIwant array based on resource array",
            WhatIwant: [
                "My Introduction and Reference Framework",
                "Proposed Progress: Academic Learning",
                "Proposed Progress: Social Learning",
                "Key Concepts to Teach",
            ],
            resource: {
                "title": lesson.title,
                "lessonMaterials": lesson.lessonMaterials,
                "lessonExercise": lesson.lessonExercise,
                "learningGoals": lesson.learningGoals,
                "lessonStructureOverview": lesson.lessonStructureOverview,
                "socialCollaborationGoal": lesson.socialCollaborationGoal
            }
        }
        // const jsonString = JSON.stringify(deitaObject);
        const response = await fetchResponse(deitaObject);
        const responseData = {
            lessonId: data.lessonId,
            previewLesson: {
                myIntroduction: response["My Introduction and Reference Framework"],
                academicLearning: response["Proposed Progress: Academic Learning"],
                socialLearning: response["Proposed Progress: Social Learning"],
                keyConcepts: response["Key Concepts to Teach"]
            }
        }
        if (deitaCheck) {
            const updatedDieta = await Deita.findOneAndUpdate({ lessonId: data.lessonId }, responseData, { new: true });
            return res.status(201).send({
                success: true,
                message: 'Deita added successfully',
                data: updatedDieta
            });
        }
        const deitaObj = new Deita(responseData);

        const newDeita = await deitaObj.save();
        res.status(201).send({
            success: true,
            message: 'Deita added successfully',
            data: newDeita
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in addDeita',
            error: error.message
        });
    }
}

const updateDeita = async (req, res) => {
    try {
        const data = req.body;
        if (!data || !data.id) {
            return res.status(400).send({
                success: false,
                message: 'Required fields are missing'
            });
        }

        const updateDeita = await Deita.findOneAndUpdate({ _id: data.id }, data, { new: true });

        res.status(201).send({
            success: true,
            message: 'Deita added successfully',
            data: updateDeita
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error update Deita',
            error: error.message
        });
    }
}


const fetchDeitaById = async (req, res) => {
    try {
        const { lessonId } = req.query;
        console.log("lessonId: ", lessonId)
        if (!lessonId) {
            return res.status(404).send({
                success: false,
                message: 'Required fields are missing'
            })
        }
        const deita = await Deita.findOne({ lessonId: lessonId });
        return res.status(200).send({
            success: true,
            message: 'deita fetched successfully',
            data: deita
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in fetchDeita API',
            error
        })
    }
}

const deleteDeita = async (req, res) => {
    try {
        const data = req.body;
        if (!data || !data.id) {
            return res.status(404).send({
                success: false,
                message: 'Required fields are missing'
            })
        }
        const deita = await Deita.findOneAndDelete({ _id: data.id });
        return res.status(200).send({
            success: true,
            message: 'delete deita successfully',
            data: deita
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in deleteDeita API',
            error
        })
    }
}

module.exports = { generateLessonSummary, updateDeita, fetchDeitaById, deleteDeita };

