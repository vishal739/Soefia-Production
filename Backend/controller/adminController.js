const Admin = require("../model/adminModel")


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