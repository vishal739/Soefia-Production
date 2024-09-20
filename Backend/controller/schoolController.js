const School= require("../model/schoolModel");

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

    const newSchool = school.save();
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

const updateSchool = async (req, res) => {
    try {
        const data = req.body;
        if (!data || !data.id) {
            return res.status(400).send({
                success: false,
                message: 'Required fields are missing'
            });
        }

        const updateSchool = new School.findOneAndUpdate({ _id: data.id }, data, { new: true });

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

const fetchSchoolById = async (req, res) => {
    try {
        const { id } = req.params.id;
        if (!id) {
            return res.status(404).send({
                success: false,
                message: 'Required fields are missing'
            })
        }
        const school = School.findOne({ _id: id });
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

const deleteSchool = async (req, res) => {
    try {
        const data = req.body;
        if (!data || !data.id) {
            return res.status(404).send({
                success: false,
                message: 'Required fields are missing'
            })
        }
        const school = School.findOneAndDelete({ _id: data.id });
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