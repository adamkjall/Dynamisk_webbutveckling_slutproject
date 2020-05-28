/* EXPRESS SETUP */

const express = require("express");
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
require("dotenv").config();
require("./fileStorage")

/* DATABASE SETUP */
const { connectToDb, mongoose } = require("./mongo");

/* Import routes */
const orderRouter = require("./routers/order.router");
const paymentRouter = require("./routers/payment.router");
const productRouter = require("./routers/product.router");
const shipmentRouter = require("./routers/shipment.router");
const userRouter = require("./routers/user.router");
const fileStorageRouter = require("./routers/fileStorage.router");

// Run the database
connectToDb();

/* Middelwares */
app.use(cors());
// Make sure to parse req.body as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//use sessions for tracking logins
app.use(
  session({
    name: "everything is",
    secret: "narwhals",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

/* Add API resourses */
app.use("/api/orders", orderRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/products", productRouter);
app.use("/api/shipments", shipmentRouter);
app.use("/api/users", userRouter);
app.use("/api/files", fileStorageRouter);

const PORT = process.env.PORT || 8080;

/* Start server */
app.listen(PORT, () =>
  console.log(`Server is up and running on port: ${PORT}`)
);
