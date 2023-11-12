const User = require('../models/user');
const bcrypt = require('bcrypt')

const isStringValid = (string) => {
    if(!string || string.length ===0){
        return true;
    }else
        return false;
}

exports.postAddUser = async (req,res) => {
    try{
        const {name, email, password} = req.body;
       if(isStringValid(name) || isStringValid(email) || isStringValid(password)){
            return res.status(400).json({err:"Bad parameter. something missing"})
       }
       bcrypt.hash(password , saltrounds , async (err , hash) => {
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

exports.login = async (req , res) => {
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
                    res.status(200).json({success: true , message: "user logged in successfully"})
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