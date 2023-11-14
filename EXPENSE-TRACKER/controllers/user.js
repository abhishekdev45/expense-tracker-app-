const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const S3Services = require('../services/S3services')
const UserServices = require('../services/userservices')

require('dotenv').config();


const isStringValid = (string) => {
    if(!string || string.length ===0){
        return true;
    }else
        return false;
}

const postAddUser = async (req,res) => {
    try{

        const {name, email, password} = req.body;
        console.log(name, email, password)
       if(isStringValid(name) || isStringValid(email) || isStringValid(password)){
            return res.status(400).json({err:"Bad parameter. something missing"})
       }
       bcrypt.hash(password , 10 , async (err , hash) => {
            await User.create({
                name,
                email,
                password : hash
            });
            res.status(201).json({message: 'Successfuly create new user'});
       })
    }catch(err) {
        res.status(403).json({err});
    }
} 

const generateAccessToken = (id , name , isPremiumUser ) => {
    return jwt.sign({ userId: id , name:name, isPremiumUser } , 'secret_key')
}

const login = async (req , res) => {
    
    try{
        const {email, password} = req.body;
        
        if(isStringValid(email) || isStringValid(password)){
            return res.status(400).json({success:false ,message:'Email id or password is missing'})
        }

       
        const user = await User.findAll({where:{email}});
        
        if(user.length > 0){
            bcrypt.compare(password , user[0].password , (err,result) =>{
                if(err){
                    throw new Error('Something went wrong');
                }
                if(result){
                    res.status(200).json({success: true , message: "user logged in successfully" , token : generateAccessToken(user[0].id , user[0].name , user[0].isPremiumUser)})
                }else{
                    return res.status(400).json({success:false,message:'Password is incorrect'})
                }
            })
        }else{
            return res.status(404).json({success:false , message:'User Does not exist'})
        }
        
    }
    catch(err){
        
        res.status(500).json({message:err, success:false});
    }
}




const getDownload = async (req , res) => {
    try{ 
        const expenses = await UserServices.getExpenses(req);
        const stringifiedExpenses = JSON.stringify(expenses);

        const userId = req.user.id;

        const filenme = `Expense${userId}/${new Date()}.txt`;
        const fileUrl = await S3Services.uploadToS3(stringifiedExpenses,filenme);
        res.status(200).json({fileUrl , success:true})

    }catch(err){
        res.status(500).json({success:false , err ,fileUrl :''});
    }

    
}

module.exports = {
    getDownload,
    postAddUser,
    login,
    generateAccessToken
}
