const express = require("express");
const sequelize = require("./utils/database");
const cors = require("cors");

const userRoute = require("./routes/user");
const expenseRoute = require("./routes/expense");
const premiumRoute = require("./routes/premium")
const mainRoute = require("./routes/main");
const passwordRoute = require("./routes/password");

const Expense = require("./models/expense");
const User = require("./models/user");
const Order = require("./models/orders");
const ForgotPasswordRequest= require("./models/ForgotPasswordRequests");
const Order = require("./models/orders");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use("/user",userRoute);
app.use("/expense",expenseRoute);
app.use("/premium",premiumRoute);
app.use("/password",passwordRoute);
app.use("/", mainRoute);

User.hasMany(Expense);
Expense.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User);
User.hasMany(ForgotPasswordRequest);
ForgotPasswordRequest.belongsTo(User);


sequelize.sync().then((result)=>{
    
    app.listen(3000);
}).catch(e=>{
    console.log(e);
})