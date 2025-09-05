const express =  require('express');

const app = express();

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 5000;
const cors = require("cors");
const { readdirSync } = require('fs');
const { connectDb } = require('./db/connection');


app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

connectDb();

app.get("/", (req, res) => {
    res.send("Hello World!")
});

readdirSync("./routes").map((route) =>
    app.use("/api", require(`./routes/${route}`))
);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});