const { required } = require("joi");
const mongoose=require("mongoose");

const studentSchema=mongoose.Schema({
    // name:{
    //     type:String,
    //     required:true
    // },
    // degreeProgram:{
    //     type:String,
    //     required:true
    // },
    // mobile:{
    //     type:String,
    //     required:true
    // },
    // address:{
    //     type:String,
    //     required:true
    // },
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    // gender:{
    //     type:String,

    // },
    myLearnings:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        },
        
    ]

})

module.exports=mongoose.model("Student",studentSchema);