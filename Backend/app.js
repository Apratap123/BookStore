const express = require("express");
const app = express();
require('dotenv').config()
const Db_Connection = require("./connection/connection.js");
const User = require("./routes/user.js");
const Book = require("./routes/book.js");
const Favourite = require("./routes/favourite.js")
const Cart = require("./routes/cart.js")
const Order = require("./routes/order.js")
const cookieParser = require("cookie-parser");
const cors = require("cors");

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/v1", User);
app.use("/api/v1", Book);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);


Db_Connection().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`server connected to ${PORT}`);
    })
}).catch(error=>console.log(error));

