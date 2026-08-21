//  Create server
const express = require('express');
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes.js");
const foodRoutes = require("./routes/food.routes.js");
const cors = require('cors');

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.get("/", (req, res) => {
    res.send("Hello from backend!");
})

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);

module.exports = app;