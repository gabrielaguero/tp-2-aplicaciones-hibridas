import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import {userRoutes, gameRoutes} from "./routes/index.js";
import cors from "cors";

mongoose
        .connect(process.env.MONGO_DEPLOY)
        .then(() => console.log("conectado a DB"))
        .catch(() => console.log("error al conectar a la base de datos"));


const app = express();

const options = {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
};
    

app.use(cors(options))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/games", gameRoutes)
app.use("/users", userRoutes)
/* app.use("/login", authRoutes) */

const port = process.env.PORT || 3002;
app.listen(port)