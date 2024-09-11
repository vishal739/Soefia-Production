const Admin= require("../model/adminModel")

// const addSchool= async (req,res)

const addAdmin= async (req,res) =>{
    try{
        const data= req.body;
        if(!data || !data.name || !data.email || !data.userId){
            return res.status(400).send({
                success: false,
                message: 'Required fields are missing'
            });
        }

        const admin = new Admin({
            userId: data.userId, //66b5fb5c285f8832124c67e8
            name: data.name,
            email: data.email,
            profileBio: data.profileBio || "No bio available",
            role: 'Admin', 
            permissions: data.permissions || [],
            school: data.schoolId 
        });

        const adminProfile= await admin.save();
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
const updateAdmin= async (req,res) =>{
    try{
        const data= req.body;
        if(!data){
            return res.status(400).send({
                success: false,
                message: 'Required fields are missing'
            });
        }

        const updateAdmin= new Admin.findOneAndUpdate({_id:id}, data, {new: true});

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

module.exports= {addAdmin,updateAdmin};