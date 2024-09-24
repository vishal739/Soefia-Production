const Class = require("../model/classDataModel")

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
            teacher: data.teacherId,    
            students: data.students || [],  
            school: data.schoolId,      
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


const updateClass = async (req, res) => {
    try {
        const data = req.body;
        if (!data || !data.id) {
            return res.status(400).send({
                success: false,
                message: 'Required fields are missing'
            });
        }

        const updateClass = await Class.findOneAndUpdate({ _id: data.id }, data, { new: true });

        res.status(201).send({
            success: true,
            message: 'Class added successfully',
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

const fetchClassById = async (req, res) => {
    try {
        const { id } = req.params.id;
        if (!id) {
            return res.status(404).send({
                success: false,
                message: 'Required fields are missing'
            })
        }
        const classData =await Class.findOne({ _id: id });
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