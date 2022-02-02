const express = require("express");
const cors = require("cors");

const sequelize = require("./config/db");
const userRouter = require("./routes/userRoute");
const adminRouter = require("./routes/adminRoute");


const app = express();

sequelize.sync().then(() => {
  console.log("Base de datos corriendo.");
});

let opcionCords = {
  origin: "*",
};

// basic config

app.use(cors(opcionCords));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// api/user
app.use('/api/user', userRouter)

// api/admin
app.use('/api/admin', adminRouter)


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Corriendo en ${PORT}`);
});
