const Class = require("../model/classModel")
const Teacher= require("../model/teacherModel")
const Lesson= require("../model/lessonModel")
const Student= require("../model/studentModel")

/**
 * Adds a new class to the database.
 * 
 * @async
 * @function addClass
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request containing class details.
 * @param {string} req.body.name - The name of the class.
 * @param {string} req.body.teacher - The teacher of the class.
 * @param {Array} [req.body.students] - The students in the class.
 * @param {string} req.body.school - The school of the class.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Sends a response with the status of the operation.
 */
const addClass = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(400).send({
                success: false,
                message: 'Required fields are missing'
            });
        }
        const newClass = new Class({
            name: data.name,           
            teacher: data.teacher,    
            students: data.students || [],  
            school: data.school,      
        });

        const ClassProfile = await newClass.save();
        res.status(201).send({
            success: true,
            message: 'Class added successfully',
            data: ClassProfile
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error at addClassAPI',
            error: error.message
        });
    }
}


/**
 * Updates a class based on the provided data in the request body.
 * 
 * @async
 * @function updateClass
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request containing class data.
 * @param {string} req.body._id - The ID of the class to update.
 * @param {string} [req.body.whatINeedToKnow] - Optional topic to add to the class's "whatINeedToKnow" array.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Sends a response with the status of the update operation.
 * @throws {Error} If there is an error during the update process.
 */
const updateClass = async (req, res) => {
    try {
        const data = req.body;
        if (!data || !data._id) {
            return res.status(400).send({
                success: false,
                message: 'Required fields are missing'
            });
        }
        let updateClass;
        if(data.whatINeedToKnow){
            updateClass = await Class.findOneAndUpdate(
                { _id: data._id },
                {
                    $push: {
                        whatINeedToKnow: {
                            topic: data.whatINeedToKnow,
                            date: Date.now() 
                        }
                    }
                },
                { new: true }
            );
        }else{
            updateClass = await Class.findOneAndUpdate({ _id: data._id }, data, { new: true });
        }

        res.status(201).send({
            success: true,
            message: 'Class updated successfully',
            data: updateClass
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error update Class',
            error: error.message
        });
    }
}

/**
 * Fetches class data by teacher ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.query - The query parameters.
 * @param {string} req.query.teacherId - The ID of the teacher.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 *
 * @throws {Error} - If there is an error during the fetch operation.
 */

const fetchClassById = async (req, res) => {
    try {
        const { teacherId } = req.query;
        if (!teacherId) {
            return res.status(404).send({
                success: false,
                message: 'Required fields are missing'
            })
        }
        const classData = await Class.find({teacherId: teacherId})
        // console.log("clASSid: ", classData);
        return res.status(200).send({
            success: true,
            message: 'fetched classData successfully',
            data: classData
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in fetchClass API',
            error
        })
    }
}

/**
 * Deletes a class based on the provided ID in the request body.
 *
 * @async
 * @function deleteClass
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.id - The ID of the class to be deleted.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the status and message.
 * @throws Will throw an error if the deletion process fails.
 */
const deleteClass = async (req, res) => {
    try {
        const data = req.body;
        if (!data || !data.id) {
            return res.status(404).send({
                success: false,
                message: 'Required fields are missing'
            })
        }
        const classData =await Class.findOneAndDelete({ _id: data.id });
        return res.status(200).send({
            success: true,
            message: 'delete classData successfully',
            data: classData
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in deleteClass API',
            error
        })
    }
}


module.exports = { addClass, updateClass, fetchClassById, deleteClass };
