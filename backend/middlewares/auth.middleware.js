import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
import { getUser } from "../services/users.service.js";

export const authenticateUser = async (req, res, next) => {
    try {
        const encryptedToken = req.cookies.token || req.headers.authorization?.split("bearer")[1].trim();
        
        if(!encryptedToken)
            return res.status(401).json({
                success: false,
                error: "No user is currently logged in"
            })

        const decryptedToken = await JWT.verify(encryptedToken, process.env.JWT_TOKEN)

        
        const user = await getUser(decryptedToken._id)
        
        console.log(user," the user from the middleware")
        if(!user){
            return res.status(404).json({
                success: false,
                error: "Invalid user" 
            })
        }
        
        req.user = user;
        
        next()
    } catch (error) {
        res.status(500).json({
            success:false,
            error: error.message
        })
    }
}