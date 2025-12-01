import cors from 'cors';
import dotenv from "dotenv";
import express from 'express';

import connectDB from "./db/index.js";
import { app } from "./app.js";



dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8000;

// let book = [];
// let id = 1;
connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) => {
    console.log("MongoDB connection failed:", error);
    process.exit(1);
});


