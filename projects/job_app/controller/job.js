import jobs from "../models/job.js"


const createJob = async(req,res) => {
    try {
        const newlyInsertedJob = await jobs.create(req.body);
        res.status(200).json({
            success:true,
            message:"job created successfully",
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Something went wrong, please try again after sometime"
        })
    }
}

const listJob = async(req,res)=>{
    const minSalary = req.query.minSalary || 0;

    const condition = {};

    if(req.query.minSalary){
        condition.salary = {
            $gt: minSalary
        }
    }
    if(req.query.title){
        condition.title = {
            $regex: new RegExp(`${req.query.title}`,"gi"),
        }
    }

    const jobList = await jobs.find(condition);
    res.status(200).json({
        success:true,
        message:"Job List",
        results:jobList,
    })
}

const updateJob = async(req,res) =>{
    console.log(req.params.id);
    const updateObj ={
        $set:req.body,
    };
    const filterObj = {
        salary:{
            $lte:80000
        }
    }
    const response = await jobs.updateMany(filterObj,updateObj);
    console.log(response);

    res.status(200).json({
        success:true,
        message:"Update job api"
    })
}

const deleteJob = (req,res) =>{
    jobs.findByIdAndDelete(id);
    res.status(201).json({
        success: true,
        message: "Delete job API",
      });
}
export  {createJob,listJob,updateJob,deleteJob};