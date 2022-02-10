require("dotenv").config()
const connectDatabase = require("./config/db");
// Start database
connectDatabase()

const express = require("express");
const errorHandler = require("./middlewares/error");
const app = express();

app.use(express.json());
app.use("/api/auth", require("./routes/auth"))
app.use("/api/private", require("./routes/private"))
app.use(errorHandler)
const PORT = process.env.PORT || 5000

const server = app.listen(PORT, ()=> {
    console.log("listening to ", PORT);
})

process.on("unhandledRejection", (err, promise) => {
console.log(`Logged Error: ${err}`);
    server.close(()=>process.exit(1))
})