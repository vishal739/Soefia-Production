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
        admins: data.admins || [] // Example: Array of admin ObjectIds
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

const updateSchool= async (req,res) =>{
    try{
        const data= req.body;
        if(!data){
            return res.status(400).send({
                success: false,
                message: 'Required fields are missing'
            });
        }

        const updateAdmin= new Admin.findOneAndUpdate({_id:data.id}, data, {new: true});

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

module.exports= {addAdmin};


