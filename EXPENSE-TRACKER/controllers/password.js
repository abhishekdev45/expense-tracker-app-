const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const Sib = require('sib-api-v3-sdk');
require('dotenv').config();

const ForgotPasswordRequest = require('../models/ForgotPasswordRequests')

exports.forgotPassword = async (req,res) => {
    try{
        const requestId = uuidv4();
        const user = await User.findAll({where:{email : req.body.email}})
        // const resetUrl = `http://localhost:3000/password/resetpassword/${requestId}`;
        await ForgotPasswordRequest.create({
            id: requestId,
            userId: user[0].id,
            isActive: true,
          });
        const client = Sib.ApiClient.instance

        const apiKey = client.authentications['api-key']
        apiKey.apikey = process.env.API_KEY

        const tranEmailApi = new Sib.TransactionalEmailsApi();

        const sender = {
            email : 'suejander8@gmail.com'
        }

        const receivers = [
            {
                email: req.body.email,
            }
        ]

        await tranEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: "password reset",
            textContent : `click here to reset password http://localhost:3000/password/resetpassword/96c81373-6d2b-452f-a65d-6ce77e457e39 `,
            htmlContent : `
                <p1>click to reset your password</p>
                <a href = 'http://localhost:3000/password/resetpassword/${params.uuid}' >click to reset</a>
            `,
            params:{
                uuid:requestId
            }
        })

        res.status(200).json({success:true , message:'Check your mail we have sent the password reset mail'});
    }catch(err){
        console.log(err);
        res.status(500).json({success:false ,err});
    }
}


exports.getResetPassword = async (req,res) => {
    try{
        const requestId = req.params.requestId;
        const request = await ForgotPasswordRequest.findOne({
            where: {
              id: requestId,
              isActive: true,
            },
          });
        if (request.length > 0) {
            const formHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Password</title>
      </head>
      <body>
          <form action="/password/updatepassword" method="post">
              <input type="hidden" name="requestId" value="${requestId}">
              <label for="newPassword">New Password:</label>
              <input type="password" id="newPassword" name="newPassword" required>
              <button type="submit">Update Password</button>
          </form>
      
      <script>
          
      </script>
      </body>
      </html>
    `;

    res.send(formHtml);
        } else {
            throw new Error("error");
        }
    }catch(err){
        res.status(500).json({success:false ,err});
    }
}

exports.postUpdatePassword = async (req,res) => {
    try{
        const requestId = req.body.requestId;
        const newPassword = req.body.newPassword;

        const forgotPasswordRequest = await ForgotPasswordRequest.findByPk(requestId);

        if (forgotPasswordRequest && forgotPasswordRequest.isActive) {
            const userId = forgotPasswordRequest.userId;
            const hashedPassword = await bcrypt.hash(newPassword, 10); // Implement your password hashing logic
            await User.update({ password: hashedPassword }, { where: { id: userId } });

            await forgotPasswordRequest.update({ isActive: false });

            res.send('Password updated successfully');
        } else {
            throw new Error("error");
        }
    }catch(err){
        res.status(404).json(err);
    }
}