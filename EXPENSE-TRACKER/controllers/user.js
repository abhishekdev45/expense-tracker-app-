const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Sib = require('sib-api-v3-sdk');
require('dotenv').config();


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

function generateAccessToken(id , name){
    return jwt.sign({ userId: id , name:name } , 'secret_key')
}

