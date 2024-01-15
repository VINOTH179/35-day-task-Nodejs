import jwt from "jsonwebtoken";

export function authMiddleware(req,res,next){
    const token = req.headers["x-auth-token"]
    if(!token){
        res.status(400).send({message:"Invalid autherization"})
    }
    jwt.verify(token,process.env.SECRET_KEY)

    next();
}