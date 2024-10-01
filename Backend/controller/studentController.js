const Student = require("../model/studentModel");

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

