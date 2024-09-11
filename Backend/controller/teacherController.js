const Teacher= require("../model/teacherModel")

const createTeacherProfile = async (req,res) =>{
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
            school: data.schoolId
        });
        const TeacherProfile= await newTeacher.save();
        res.status(201).send({
            success: true,
            message: 'Lesson created successfully',
            data: savedLesson
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error creating the lesson',
            error: error.message
        });
    }
}