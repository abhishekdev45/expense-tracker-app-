const express = require("express");
const sequelize = require("./utils/database");
const cors = require("cors");

const userRoute = require("./routes/user");
const expenseRoute = require("./routes/expense")
const mainRoute = require("./routes/main");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use("/user",userRoute);
app.use("/expense",expenseRoute);
app.use("/", mainRoute);

sequelize.sync().then((result)=>{
    
    app.listen(3000);
}).catch(e=>{
    console.log(e);
})