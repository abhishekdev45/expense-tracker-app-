const Expense = require('../models/expense');
const sequelize = require('../utils/database');
const User = require('../models/user');

exports.postUserData = async (req,res)=>{
    
    try{
        const t = await sequelize.transaction();

        const expenseAmount = req.body.expenseAmount;
        const expenseDescription = req.body.expenseDescription;
        const expenseCategory = req.body.expenseCategory;
        const expenseDate = req.body.expenseDate;

        if(expenseAmount == undefined || expenseAmount.length === 0){
            return res.status(400).json({success:false , message:'parameter missing'})
        }
      
        const data = await Expense.create({
            expenseAmount:expenseAmount,
            expenseDescription:expenseDescription,
            expenseCategory:expenseCategory,
            expenseDate:expenseDate,
            UserId:req.user.id
        } , {transaction:t});

        await User.increment('totalExpense', {
            by: expenseAmount,
            where: { id: req.user.id },
            transaction:t
        });
        
        await t.commit();
        res.status(201).json({success:true ,newData:data});
    }catch(err){
       await t.rollback();
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
    try {
        const t = await sequelize.transaction();

        if (!req.params.id || req.params.id === "undefined") {
            await t.rollback(); 
            return res.status(400).json({ success: false, message: "id not found" });
        }

        const expenseId = req.params.id;

        const expense = await Expense.findOne({ where: { id: expenseId, userId: req.user.id }, transaction: t });

        if (!expense) {
            await t.rollback();
            return res.status(404).json({ success: false, message: "Expense not found" });
        }

        const expenseAmount = expense.expenseAmount;

        await User.decrement('totalExpense', {
            by: expenseAmount,
            where: { id: req.user.id },
            transaction: t
        });

        await Expense.destroy({ where: { id: expenseId, userId: req.user.id }, transaction: t });

        await t.commit(); 

        res.sendStatus(200);
    } catch (err) {
        await t.rollback();
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};




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

