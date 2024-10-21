const Deita = require("../model/deitaModel")
const Lesson = require("../model/lessonModel");
const { fetchPreviewLesson, fetchNewLesson } = require("../utils/openai");


const lessonGenerator = async (data) => {
    try {
        // const data = req.body;
        // if (!data) {
        //     return res.status(400).send({
        //         success: false,
        //         message: 'Required fields are missing'
        //     });
        // }
        console.log("data: ", data);
        const deitaObject = {
            content: "generate the fields of whatIwant array in String type for database validation based on resource array",
            WhatIwant: [
                "title",
                "lessonMaterials",
                "lessonExercise",
                "learningGoals",
                "lessonStructureOverview",
                "socialCollaborationGoal",
                "lessonSummary"
            ],
            resource: data.input
        };

        const response = await fetchNewLesson(deitaObject);
        // console.log("response: ", response);
        const responseData = {
            title: response.title,
            date: Date.now(),
            lessonMaterials: response.lessonMaterials,
            lessonExercise: response.lessonExercise,
            type: "upcoming",
            learningGoals: response.learningGoals,
            lessonSummary: response.lessonSummary,
            lessonStructureOverview: response.lessonStructureOverview,
            socialCollaborationGoal: response.socialCollaborationGoal,
            status: "Draft",
            groups: response.groups || [],
            classId: "66f3c287556e51f51bdf34a9",
            teacherId: "66ee7b9064cf488d67683b68"
        };
        const newLesson= new Lesson(responseData);
        newLesson.save();
        console.log("newLesson: ", newLesson);
        // res.status(201).send({
        //     success: true,
        //     message: 'Deita added successfully',
        //     data: new
        // });
        return newLesson;
    } catch (error) {
        console.error(error);
        // res.status(500).send({
        //     success: false,
        //     message: 'Error in addDeita',
        //     error: error.message
        // });
    }
    // res.status(200).send({"function": "lessonGenerator"})
};

/**
 * Generates a lesson summary based on the provided lesson ID and request body data.
 * 
 * @async
 * @function generateLessonSummary
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.lessonId - The ID of the lesson to generate the summary for.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Sends a response with the generated lesson summary or an error message.
 * 
 * @throws {Error} If there is an error during the process, it sends a 500 status code with an error message.
 */
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
        //Checking if LessonSummaryAlreadyExist
        const deitaCheck = await Deita.findOne({ lessonId: data.lessonId });
        //passing the fields to generate the prompt
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
        const response = await fetchPreviewLesson(deitaObject);
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

/**
 * Updates an existing Deita entry.
 *
 * @async
 * @function updateDeita
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.id - The ID of the Deita to update.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Sends a response with the update status.
 * @throws {Error} If there is an error during the update process.
 */

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


/**
 * Fetches Deita by lesson ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.query - The query parameters.
 * @param {string} req.query.lessonId - The ID of the lesson to fetch Deita for.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 *
 * @throws {Error} - If there is an error during the fetch operation.
 */
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

/**
 * Deletes a Deita document based on the provided ID in the request body.
 *
 * @async
 * @function deleteDeita
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.id - The ID of the Deita document to delete.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Sends a response with the result of the deletion operation.
 * @throws Will send a 500 status code if an error occurs during the deletion process.
 */
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


module.exports = {
    lessonGenerator,
    generateLessonSummary,
    updateDeita,
    fetchDeitaById,
    deleteDeita
};


