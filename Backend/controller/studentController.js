const Student = require("../model/studentModel");

/**
 * Adds a new student to the database.
 *
 * @async
 * @function addStudent
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request containing student data.
 * @param {string} req.body.userId - The user ID of the student.
 * @param {string} req.body.name - The name of the student.
 * @param {string} req.body.email - The email of the student.
 * @param {string} [req.body.profileBio="No Bio"] - The profile bio of the student.
 * @param {string} req.body.classId - The class ID of the student.
 * @param {Object} req.body.academicFactors - The academic factors of the student.
 * @param {string} req.body.school - The school of the student.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 * @throws {Error} - Throws an error if there is an issue adding the student.
 */
const addStudent = async (req, res) => {
    try {
        const data = req.body;
        if (!data || !data.name || !data.address || !data.contactNumber) {
            return res.status(400).send({
                success: false,
                message: 'Required fields are missing'
            });
        }


        const student = new Student({
            userId: data.userId,
            name: data.name,
            email: data.email,
            profileBio: data.profileBio || "No Bio",
            classId: data.classId,
            academicFactors: data.academicFactors,
            school: data.school
        });


        const newStudent = await student.save();
        res.status(201).send({
            success: true,
            message: 'Student added successfully',
            data: newStudent
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in addStudent',
            error: error.message
        });
    }
}

/**
 * Updates a student's information in the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request containing student data.
 * @param {string} req.body.id - The ID of the student to update.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 *
 * @throws {Error} - If there is an error during the update process.
 */
const updateStudent = async (req, res) => {
    try {
        const data = req.body;
        if (!data || !data.id) {
            return res.status(400).send({
                success: false,
                message: 'Required fields are missing'
            });
        }

        const updateStudent = await Student.findOneAndUpdate({ _id: data.id }, data, { new: true });

        res.status(201).send({
            success: true,
            message: 'Student added successfully',
            data: updateStudent
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error update Student',
            error: error.message
        });
    }
}

/**
 * Fetches a student by their ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.params - The parameters from the request.
 * @param {string} req.params.id - The ID of the student to fetch.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 *
 * @throws {Error} - If there is an error during the fetch operation.
 */
const fetchStudentById = async (req, res) => {
    try {
        const { id } = req.params.id;
        if (!id) {
            return res.status(404).send({
                success: false,
                message: 'Required fields are missing'
            })
        }
        const student = await Student.findOne({ _id: id });
        return res.status(200).send({
            success: true,
            message: 'fetched student successfully',
            data: student
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in fetchStudent API',
            error
        })
    }
}

/**
 * Fetches students by class ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.params - The parameters from the request.
 * @param {string} req.params.class - The class parameter containing the class ID.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - Returns a promise that resolves to void.
 *
 * @throws {Error} - Throws an error if there is an issue with fetching students.
 */
const fetchStudentByClass = async (req, res) => {
    try {
        const { classid } = req.params.class;
        if (!classid) {
            return res.status(404).send({
                success: false,
                message: 'Required fields are missing'
            })
        }
        const student = await Student.find({ clasId: classid });
        return res.status(200).send({
            success: true,
            message: 'fetched student successfully',
            data: student
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in fetchStudent API',
            error
        })
    }
}

/**
 * Deletes a student based on the provided ID in the request body.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.id - The ID of the student to be deleted.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the student is deleted.
 *
 * @throws {Error} - If there is an error during the deletion process.
 */
const deleteStudent = async (req, res) => {
    try {
        const data = req.body;
        if (!data || !data.id) {
            return res.status(404).send({
                success: false,
                message: 'Required fields are missing'
            })
        }
        const student = await Student.findOneAndDelete({ _id: data.id });
        return res.status(200).send({
            success: true,
            message: 'delete student successfully',
            data: student
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in deleteStudent API',
            error
        })
    }
}

module.exports = { addStudent, updateStudent, fetchStudentById, fetchStudentByClass, deleteStudent };

