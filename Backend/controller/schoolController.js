const School= require("../model/schoolModel");

/**
 * Adds a new school to the database.
 *
 * @async
 * @function addSchool
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request containing school data.
 * @param {string} req.body.name - The name of the school.
 * @param {string} req.body.address - The address of the school.
 * @param {string} req.body.contactNumber - The contact number of the school.
 * @param {Array<ObjectId>} [req.body.teachers] - An optional array of teacher ObjectIds.
 * @param {Array<ObjectId>} [req.body.students] - An optional array of student ObjectIds.
 * @param {Array<ObjectId>} [req.body.admins] - An optional array of admin ObjectIds.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Sends a response with the status and result of the operation.
 * @throws {Error} If there is an error while adding the school.
 */
const addSchool = async(req,res) =>{
    try{
    const data= req.body;
    if(!data || !data.name || !data.address || !data.contactNumber){
        return res.status(400).send({
            success: false,
            message: 'Required fields are missing'
        });
    }

    const school = new School({
        name: data.name, // Example: "Springfield High School"
        address: data.address, // Example: "123 Main St, Springfield"
        contactNumber: data.contactNumber, // Example: "555-1234"
        teachers: data.teachers || [], // Example: Array of teacher ObjectIds
        students: data.students || [], // Example: Array of student ObjectIds
        admins: data.admins || [] // Example: Array of admins ObjectIds
    });

    const newSchool = await school.save();
    res.status(201).send({
        success: true,
        message: 'School added successfully',
        data: newSchool
    });
    }catch(error){
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in addSchool',
            error: error.message
        });
    }
}

/**
 * Updates a school record in the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request containing the school data.
 * @param {string} req.body.id - The ID of the school to update.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 *
 * @throws {Error} - If there is an error during the update process.
 */
const updateSchool = async (req, res) => {
    try {
        const data = req.body;
        if (!data || !data.id) {
            return res.status(400).send({
                success: false,
                message: 'Required fields are missing'
            });
        }

        const updateSchool = await School.findOneAndUpdate({ _id: data.id }, data, { new: true });

        res.status(201).send({
            success: true,
            message: 'School added successfully',
            data: updateSchool
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error update School',
            error: error.message
        });
    }
}

/**
 * Fetches a school by its ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.params - The parameters object.
 * @param {string} req.params.id - The ID of the school to fetch.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 *
 * @throws {Error} - If there is an error during the fetch operation.
 */
const fetchSchoolById = async (req, res) => {
    try {
        const { id } = req.params.id;
        if (!id) {
            return res.status(404).send({
                success: false,
                message: 'Required fields are missing'
            })
        }
        const school =await School.findOne({ _id: id });
        return res.status(200).send({
            success: true,
            message: 'fetched school successfully',
            data: school
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in fetchSchool API',
            error
        })
    }
}

/**
 * Deletes a school from the database.
 *
 * @async
 * @function deleteSchool
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.id - The ID of the school to delete.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the status and message.
 * @throws Will throw an error if the deletion fails.
 */
const deleteSchool = async (req, res) => {
    try {
        const data = req.body;
        if (!data || !data.id) {
            return res.status(404).send({
                success: false,
                message: 'Required fields are missing'
            })
        }
        const school = await School.findOneAndDelete({ _id: data.id });
        return res.status(200).send({
            success: true,
            message: 'delete school successfully',
            data: school
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in deleteSchool API',
            error
        })
    }
}

module.exports = { addSchool, updateSchool, fetchSchoolById, deleteSchool };