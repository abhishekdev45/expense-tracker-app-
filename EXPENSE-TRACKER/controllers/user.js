const User = require('../models/user');

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

        let newUser = await User.create({
            name,
            email,
            password
        });
        

        res.status(201).json({message: 'Successfuly create new user'});
    }catch(err) {
        res.status(403).json({err});
    }
}

exports.login = async (req , res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({where:{email: email}});
        if(user === null || user.password != password){
            return res.status(400).json({err:"user not found"});
        }
        res.status(201).json({message: 'Successfuly logged in'});
    }
    catch(err){
        res.status(403).json({err});
    }
}