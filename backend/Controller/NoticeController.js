const Notice = require("../Models/Notice");
const Course = require("../Models/courses");


module.exports.postNotice= async(req,res,next)=>{
    try{
        const {course} = req.query;
        console.log(course);
        const resp=await Course.findById(course);
        const {title,notice}= req.body;
        const newnotice= new Notice({
            course,
            title,
            notice
        })
        await newnotice.save();
        res.json("Notice Posted Successfully");
    }
    catch(err){
        res.json(err)
    }
}

module.exports.getNotice=async(req,res)=>{
    try{
        const {course}= req.query;
        const notices=await Notice.find({course:course});
        await res.json(notices);
    }
    catch(err){
        res.json(err);
    }
}