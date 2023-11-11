const User = require('../models/user');
const { UniqueConstraintError } = require('sequelize');

exports.postAddUser = async(req,res) => {
    try{
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        console.log(name);

        let newUser = await User.create({
            name,
            email,
            password
        });
        

        res.status(201).json({newUser:newUser});
    }catch(err) {
        res.status(403).json({error:err});
    }
}