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


const updateJob = async (req, res) => {
    try {
        const { id } = req.params;

        const updateObj = {
            $set: req.body,
        };

        const filterObj = {
            _id: id, // Ensure the update is for the specific job by its ID
            salary: {
                $lte: 80000, // Additional filter for the salary
            },
        };

        const response = await jobs.updateMany(filterObj, updateObj);
        console.log(response);

        if (response.nModified === 0) {
            return res.status(404).json({
                success: false,
                message: 'No job found with the specified criteria',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Job updated successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
};



const deleteJob = async (req, res) => {
    try {
      const id = req.params.id; // Extract the job ID from the request parameters
  
      const job = await jobs.findByIdAndDelete(id);
  
      if (!job) {
        return res.status(404).json({
          success: false,
          message: 'Job not found',
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Job deleted successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Server Error',
      });
    }
  };
export  {createJob,listJob,updateJob,deleteJob};