import express from "express";
import { getUser, getUsers, registerUser, loginUser } from "../controller/userController.js";
import tokenVerify from '../middleware/auth.js';

const userRoutes =  express.Router();

userRoutes.get('/',  getUsers);

userRoutes.get('/find/:userId', getUser);

userRoutes.post('/register', registerUser);

userRoutes.post('/login', loginUser);


export {userRoutes};


