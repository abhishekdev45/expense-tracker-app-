const Expense = require('../models/expense');

exports.postUserData = async (req,res)=>{
    try{
        const expenseAmount = req.body.expenseAmount;
        const expenseDescription = req.body.expenseDescription;
        const expenseCategory = req.body.expenseCategory;
      
        const data = await Expense.create({
            expenseAmount:expenseAmount,
            expenseDescription:expenseDescription,
            expenseCategory:expenseCategory,
            userId:req.user.id
        });
        res.status(201).json({success:true ,newData:data});
    }catch(err){
       res.status(500).json({success:false , message:err});
    }
  
}

exports.getUserData = async (req,res)=>{
    try{
       const data = await Expense.findAll({ where : {userId : req.user.id} });
       res.status(200).json({success:true ,allData:data})
    }catch(err){
        res.status(500).json({success:false ,message:err})
    }
}

exports.postDeleteData = async (req,res)=>{
    try{
        if(!req.params.id == "undefined"){
           return res.status(400).json({success:false ,message:"id not found"});
        }
        const userId = req.params.id;
        await Expense.destroy({where:{id:userId , userId: req.user.id}});
        res.sendStatus(200);
    }catch(err){
        res.status(500).json({success:false , message:err});
    }


}

// exports.postUpdateData = async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const expenseAmount = req.body.expenseAmount;
//         const expenseDescription = req.body.expenseDescription;
//         const expenseCategory = req.body.expenseCategory;

//         const existingData = await Expense.findByPk(userId);

//         if (!existingData) {
//             return res.status(404).json({ error: "Expense not found" });
//         }

//         existingData.expenseAmount = expenseAmount;
//         existingData.expenseDescription = expenseDescription;
//         existingData.expenseCategory = expenseCategory;

//         await existingData.save();

//         res.status(200).json({ updatedData: existingData });
//     } catch (e) {
//         res.status(500).json({ error: e });
//     }
// };

