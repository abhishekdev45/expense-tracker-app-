const express = require("express");
const sequelize = require("./utils/database");
const cors = require("cors");

const addUserRoute = require("./routes/user");
const mainRoute = require("./routes/main");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use("/user",addUserRoute);
app.use("/", mainRoute);

sequelize.sync().then((result)=>{
    
    app.listen(3000);
}).catch(e=>{
    console.log(e);
})