//quiz question add section handel//


const questionService = require("../services/questionService");
//create quiz 
//
const createQuestion =async (req, res) => {
    try{
        const questionData =req.body;
        const result= await questionService.createQuestion(questionData);
        res.status(201).json({
            success:true,
            message:"Question create successfully ",
            questionId:result.insertId
        });

    }
    catch (error){
        console.error("Create question error:", error);
          res.status(500).json({
            success:false,
            message:"Failed to create question",
            error:error.message
        });

    };

}
    //get questions//

const getQuestion= async (req,res)=>{
    try{
        const questions= await questionService.getQuestion();
         res.status(200).json({
           success: true,
           count: questions.length,
           questions,
         });
         }
         catch(error){
            console.error("get qustions error:", error);
            res.status(500).json({
                success:false,
                message:"Failed to fetch quesstions",
                error:error.message
            });
            }
};
module.exports={
    createQuestion,getQuestion
};


