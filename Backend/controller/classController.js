const Class = require("../model/classModel")
const Teacher= require("../model/teacherModel")
const Lesson= require("../model/lessonModel")
const Student= require("../model/studentModel")

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
        console.log("clASSid: ", classData);
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



// const addNotebook = async(req,res) =>{
//     try{
//     const data= req.body;
//     if(!data || !data.class || !data.address){
//         return res.status(400).send({
//             success: false,
//             message: 'Required fields are missing'
//         });
//     }

    
//     const notebook = new Notebook({
//         name: data.name,
//         classes: data.classes,
//         reviewNotes: data.reviewNotes,
//         socialSummary: {
//             engagement: {
//                 Academic: data.socialSummary?.engagement?.Academic || 0,  
//                 Social: data.socialSummary?.engagement?.Social || 0  
//             },
//             sentiment: {
//                 positive: data.socialSummary?.sentiment?.positive || 0, 
//                 negative: data.socialSummary?.sentiment?.negative || 0 
//             }
//         },
//         summaryObservation: data.summaryObservation || "",
//         review: data.review || ""
//     });
    

//     const newNotebook = await notebook.save();
//     res.status(201).send({
//         success: true,
//         message: 'Notebook added successfully',
//         data: newNotebook
//     });
//     }catch(error){
//         console.error(error);
//         res.status(500).send({
//             success: false,
//             message: 'Error in addNotebook',
//             error: error.message
//         });
//     }
// }