const Admin = require("../model/adminModel")


/**
 * Adds a new admin to the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.name - The name of the admin.
 * @param {string} req.body.email - The email of the admin.
 * @param {string} req.body.userId - The user ID of the admin.
 * @param {string} [req.body.profileBio] - The profile bio of the admin.
 * @param {Array} [req.body.permissions] - The permissions assigned to the admin.
 * @param {string} req.body.schoolId - The school ID associated with the admin.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the admin is added.
 */
const addAdmin = async (req, res) => {
    try {
        const data = req.body;
        if (!data || !data.name || !data.email || !data.userId) {
            return res.status(400).send({
                success: false,
                message: 'Required fields are missing'
            });
        }

        const admin = new Admin({
            userId: data.userId, 
            name: data.name,
            email: data.email,
            profileBio: data.profileBio || "No bio available",
            role: 'Admin',
            permissions: data.permissions || [],
            school: data.schoolId
        });

        const adminProfile = await admin.save();
        res.status(201).send({
            success: true,
            message: 'Admin added successfully',
            data: adminProfile
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error adding Admin',
            error: error.message
        });
    }
}

/**
 * Updates an admin's information.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request containing admin data.
 * @param {string} req.body.id - The ID of the admin to update.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - Sends a response with the update status.
 *
 * @throws {Error} - If there is an error during the update process.
 */
const updateAdmin = async (req, res) => {
    try {
        const data = req.body;
        if (!data || !data.id) {
            return res.status(400).send({
                success: false,
                message: 'Required fields are missing'
            });
        }

        const updateAdmin = await Admin.findOneAndUpdate({ _id: data.id }, data, { new: true });

        res.status(201).send({
            success: true,
            message: 'Admin added successfully',
            data: updateAdmin
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error update Admin',
            error: error.message
        });
    }
}

/**
 * Fetches an admin by their ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.id - The ID of the admin to fetch.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 *
 * @throws {Error} - If there is an error during the fetch operation.
 */
const fetchAdminById = async (req, res) => {
    try {
        const { id } = req.params.id;
        if (!id) {
            return res.status(404).send({
                success: false,
                message: 'Required fields are missing'
            })
        }
        const admin = await Admin.findOne({ _id: id });
        return res.status(200).send({
            success: true,
            message: 'fetched admin successfully',
            data: admin
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in fetchAdmin API',
            error
        })
    }
}

/**
 * Deletes an admin based on the provided ID in the request body.
 * 
 * @async
 * @function deleteAdmin
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.id - The ID of the admin to be deleted.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the status and message.
 * @throws Will throw an error if the deletion process fails.
 */
const deleteAdmin = async (req, res) => {
    try {
        const data = req.body;
        if (!data || !data.id) {
            return res.status(404).send({
                success: false,
                message: 'Required fields are missing'
            })
        }
        const admin = await Admin.findOneAndDelete({ _id: data.id });
        return res.status(200).send({
            success: true,
            message: 'delete admin successfully',
            data: admin
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in deleteAdmin API',
            error
        })
    }
}

module.exports = { addAdmin, updateAdmin, fetchAdminById, deleteAdmin };