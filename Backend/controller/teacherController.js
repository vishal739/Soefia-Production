const Teacher = require("../model/teacherModel")

/**
 * Adds a new teacher to the database.
 *
 * @async
 * @function addTeacher
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request containing teacher data.
 * @param {string} req.body.userId - The user ID of the teacher.
 * @param {string} req.body.name - The name of the teacher.
 * @param {string} req.body.email - The email of the teacher.
 * @param {string} req.body.schoolId - The school ID associated with the teacher.
 * @param {string} [req.body.profileBio] - The profile bio of the teacher.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Sends a response with the status and result of the operation.
 * @throws Will send a 500 status code if an error occurs during the operation.
 */
const addTeacher = async (req, res) => {
    try {
        const data = req.body;
        if (!data || !data.name || !data.email || !data.schoolId || !data.userId) {
            return res.status(400).send({
                success: false,
                message: 'Required fields are missing'
            });
        }
        const newTeacher = new Teacher({
            userId: data.userId,
            name: data.name,
            email: data.email,
            profileBio: data.profileBio || "No bio available",
            upcomingClasses: [],
            previousClasses: [],
            schoolId: data.schoolId
        });
        const TeacherProfile = await newTeacher.save();
        res.status(201).send({
            success: true,
            message: 'Teacher added successfully',
            data: TeacherProfile
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error at addTeacherAPI',
            error: error.message
        });
    }
}


/**
 * Updates a teacher's information based on the provided data in the request body.
 * 
 * @async
 * @function updateTeacher
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request containing the data to update.
 * @param {string} req.body.id - The ID of the teacher to update.
 * @param {Array} [req.body.classes] - An array of classes to add to the teacher's record.
 * @param {Array} [req.body.upcomingLesson] - An array of upcoming lessons to add to the teacher's record.
 * @param {Array} [req.body.previousLesson] - An array of previous lessons to add to the teacher's record.
 * @param {string} [req.body.completedLectureId] - The ID of a completed lecture to move from upcoming to previous lessons.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Sends a response with the status of the update operation.
 * @throws {Error} If there is an error during the update process.
 */
const updateTeacher = async (req, res) => {
    try {
        const data = req.body;
        if (!data || !data.id) {
            return res.status(400).send({
                success: false,
                message: 'Required fields are missing'
            });
        }

        const updateFields = {};

        if (data.completedLectureId) {
            
            updateFields.$pull = { upcomingLesson: data.completedLectureId };
            updateFields.$push = { previousLesson: data.completedLectureId };
        } else {
            for (const key in data) {
                if (key === 'classes' || key === 'upcomingLesson' || key === 'previousLesson') {
                    updateFields.$push = updateFields.$push || {};

                    if (Array.isArray(data[key])) {
                        updateFields.$push[key] = { $each: data[key] };
                    } else {
                        updateFields.$push[key] = data[key]; 
                    }
                } else if (key !== 'id') {
                    updateFields.$set = updateFields.$set || {};
                    updateFields.$set[key] = data[key]; 
                }
            }
        }

        const updatedTeacher = await Teacher.findOneAndUpdate(
            { _id: data.id },
            updateFields,
            { new: true }
        );

        if (!updatedTeacher) {
            return res.status(404).send({
                success: false,
                message: 'Teacher not found'
            });
        }

        res.status(200).send({
            success: true,
            message: 'Teacher updated successfully',
            data: updatedTeacher
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error updating teacher',
            error: error.message
        });
    }
}



/**
 * Fetches a teacher by their ID.
 *
 * @async
 * @function fetchTeacherById
 * @param {Object} req - The request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.id - The ID of the teacher to fetch.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Sends a response with the teacher data or an error message.
 */
const fetchTeacherById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(404).send({
                success: false,
                message: 'Required fields are missing'
            })
        }
        const teacher = await Teacher.findOne({ _id: id });
        console.log(teacher);
        return res.status(200).send({
            success: true,
            message: 'fetched teacher successfully',
            data: teacher
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in fetchTeacher API',
            error
        })
    }
}

/**
 * Deletes a teacher based on the provided ID in the request body.
 *
 * @async
 * @function deleteTeacher
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.id - The ID of the teacher to be deleted.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the status and message.
 * @throws Will throw an error if the deletion process fails.
 */
const deleteTeacher = async (req, res) => {
    try {
        const data = req.body;
        if (!data || !data.id) {
            return res.status(404).send({
                success: false,
                message: 'Required fields are missing'
            })
        }
        const teacher = await Teacher.findOneAndDelete({ _id: data.id });
        return res.status(200).send({
            success: true,
            message: 'delete teacher successfully',
            data: teacher
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in deleteTeacher API',
            error
        })
    }
}

module.exports = { addTeacher, updateTeacher, fetchTeacherById, deleteTeacher };