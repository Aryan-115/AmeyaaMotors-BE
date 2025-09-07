import cors from "cors";
const express =  require('express');

const app = express();

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 5000;
const cors = require("cors");
const { readdirSync } = require('fs');
const { connectDb } = require('./db/connection');


const allowedOrigins = [
  process.env.CLIENT_URL,        // Vercel domain
  "https://www.ameyaamotorsev.com"       // GoDaddy custom domain
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
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