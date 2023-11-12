const express = require("express");
const sequelize = require("./utils/database");
const cors = require("cors");

const userRoute = require("./routes/user");
const expenseRoute = require("./routes/expense")
const mainRoute = require("./routes/main");

const Expense = require("./models/expense");
const User = require("./models/user");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use("/user",userRoute);
app.use("/expense",expenseRoute);
app.use("/", mainRoute);

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize.sync().then((result)=>{
    
    app.listen(3000);
}).catch(e=>{
    console.log(e);
})