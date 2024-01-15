import express from "express"
import bcrypt from "bcrypt";
import { addUser, generateToken, getUser } from "../Controller/user.js";
const router = express.Router();

router.post("/signup",async (req,res)=>{
    try {
        // generate salt value
        const salt = await bcrypt.genSalt(10);
        const user = await getUser(req.body.email);
        if(!user){
        // hash the password
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        const hashUser = await {...req.body,password:hashedPassword}
        // add the newuser
        const result = await addUser(hashUser);
        if(!result.acknowledged){
            return res.status(400).send({message:"Error uploading please tryagain"});
        }
            return res.status(201).send({result,data:hashUser});
        }
        res.status(400).send({message:"Given mail already exist"})
    } catch (error) {
        console.log(error);
        res.status(500).send({message : "Internal server error"})
    }
})

router.post("/login",async (req,res)=>{
    try {
        // collect the req.body and find the user exist
        const user = await getUser(req.body.email);
        if(!user){
            return res.status(400).send({message:"Invalid email address"})
        }
        // check is the password is right
        const validPassword = await bcrypt.compare(req.body.password,user.password);
        if(!validPassword){
            return res.status(400).send({message:"Invalid password"})
        }
        const token = generateToken(user._id)
        res.status(200).send({user,token})
    } catch (error) {
        console.log(error);
        res.status(500).send({message : "Internal server error"})
    }
})
export const userRouter = router;