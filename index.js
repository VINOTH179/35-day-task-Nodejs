import express from "express";
import cors from "cors";
import { studentsRouter } from "./Routes/student.js";
import dotenv from "dotenv";
import { userRouter } from "./Routes/user.js";
import { authMiddleware } from "./Authentication/auth.js";
// initializing a express server

const app = express();

// Environmental configuration
dotenv.config();

//port
const PORT = process.env.PORT;

//middleware
app.use(express.json());

app.use(cors());

//application routes
app.use("/students",authMiddleware,studentsRouter);
app.use("/user",userRouter);

//start the server
app.listen(PORT, () => console.log(`Server started in localhost : ${PORT}`));
