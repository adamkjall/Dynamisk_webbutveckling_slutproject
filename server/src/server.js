const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();

const { connectToDb } = require("./mongo");

/* Import routes */
const productRouter = require("./routers/product.router");
const orderRouter = require("./routers/order.router")
const userRouter = require("./routers/user.router");

// run the database
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
      secret: "unique",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60 * 60 * 24,
        secure: false,
        sameSite: true,
      },
    })
  );

/* Add API resourses */
// app.use(userRouter);
// app.use(postRouter);

const PORT = process.env.PORT || 8080;

/* Start server */
app.listen(PORT, () =>
  console.log(`Server is up and running on port: ${PORT}`)
);
