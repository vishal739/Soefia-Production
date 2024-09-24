const Teacher= require("../model/teacherModel")

const addTeacher = async (req,res) =>{
    try{
        const data= req.body;
        if(!data || !data.name || !data.email || !data.schoolId || !data.userId){
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
        const TeacherProfile= await newTeacher.save();
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


const updateTeacher = async (req, res) => {
    try {
        const data = req.body;
        if (!data || !data.id) {
            return res.status(400).send({
                success: false,
                message: 'Required fields are missing'
            });
        }

        const updateTeacher = await Teacher.findOneAndUpdate({ _id: data.id }, data, { new: true });

        res.status(201).send({
            success: true,
            message: 'Teacher added successfully',
            data: updateTeacher
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error update Teacher',
            error: error.message
        });
    }
}

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