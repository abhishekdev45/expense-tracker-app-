const Razorpay = require('razorpay');
const Order = require('../models/orders')
const userControllers = require("./user");

exports.purchasePremium = async (req,res) => {
    try{
        var rzp = new Razorpay({
            key_id: 'rzp_test_Wjuyb0lZu954ow',
            key_secret: 'f4nI149IEyAA0Nb4tHaD2n49'
        })
        const amount = 2500;

        rzp.orders.create({amount, currency:"INR"}, (err,order) => {
            if(err){
                throw new Error(JSON.stringify(err));
            }
            req.user.createOrder({orderid:order.id, status: 'PENDING'}).then(() => {
                return res.status(201).json({order, key_id : rzp.key_id});
            }).catch(err => {
                throw new Error(JSON.stringify(err));
            })
        })
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Something went wrong', error: err });
    }
}

// const updateTransactionStatus = async (req,res) => {
//     try{
//         const{payment_id , order_id} = req.body;
//         Order.findOne({where:{orderid : order_id}}).then(order => {
//             order.update({paymentid: payment_id , status: 'SUCCESSFUL'}).then(() => {
//                 req.user.update({isPremiumUser:true}).then(()=>{
//                     return res.status(202).json({success:true, message:"Transaction status successfull"});
//                 }).catch((err) => {
//                     throw new Error(err);
//                 })
//             }).catch(err => {
//                 throw new Error(err);
//             })
//         })
//     }catch(err){

//     }
// }

exports.updateTransactionStatus = async (req, res) => {
    let order_id;
    try {
        const { payment_id, order_id :  orderId } = req.body;
        order_id = orderId;
        const userId = req.user.id

        const order = await Order.findOne({ where: { orderid: order_id } });
        const promise1 = order.update({ paymentid: payment_id, status: 'SUCCESSFUL' } )
        const promise2 = req.user.update({ isPremiumUser: true })

        await Promise.all([promise1, promise2])
    

        return res.status(202).json({ success: true, message: "Transaction status successful", token: userControllers.generateAccessToken(userId , undefined, true)});
    } catch (err) {
        console.error(err);

        try {
            const order = await Order.findOne({ where: { orderid: order_id } });

            if (order) {
                await order.update({ status: 'FAILED' });
            }
        } catch (updateError) {
            console.error(updateError);
        }

        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

