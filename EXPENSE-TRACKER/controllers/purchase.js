const Razorpay = require('razorpay');
const Order = require('../models/orders')

const purchasePremium = async (req,res) => {
    try{
        var rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })
        const amount = 2500;

        rzp.orders.create({amount, currency:"INR"}, (err,order) => {
            if(err){
                throw new Error(JSON.stringify(err));
            }
            req.user.createOrder({orderid:order.id, status: 'PENDING'}).then(() => {
                return res.status(201).json({order, key_id : rzp.key_id});
            }).catch(err => {
                throw new Error(err);
            })
        })
    }catch(err){
        res.status(403).json({message:'Something went wrong' , error: err})
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

const updateTransactionStatus = async (req, res) => {
    try {
        const { payment_id, order_id } = req.body;

        const order = await Order.findOne({ where: { orderid: order_id } });

        const [updatedOrder, updatedUser] = await Promise.all([
            order.update({ paymentid: payment_id, status: 'SUCCESSFUL' }),
            req.user.update({ isPremiumUser: true })
        ]);

        return res.status(202).json({ success: true, message: "Transaction status successful" });
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

module.exports = {
    purchasePremium,
    updateTransactionStatus
}