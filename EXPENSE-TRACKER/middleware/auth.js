const jwt = require('jsonwebtoken');
const User = reuire('../models/user');

const authenticate = async (req,res,next) => {
    try{
        const token = req.header('Authorization');
        const userObj = jwt.verify(token,'secret_key');

        const user = User.findByPk(userObj.userId);
        req.user = user;
        next();
    }
    catch(err){
        return res.status(401).json({success:false , message:'user not authenticated'});
    }
}

module.exports = {
    authenticate
}