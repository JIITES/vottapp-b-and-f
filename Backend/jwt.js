const jwt= require('jsonwebtoken');
require('dotenv').config();

    const jwtAuthMiddleware= (req,res,next)=>{

        const authheader=req.headers.authorization;

        if(!authheader){
            console.log('Authorization header missing');
            return res.status(401).json({error:'Authorization header missing,please login again'});
            
        }

        const token=authheader.split(' ')[1]; // Assuming Bearer token
        if(!token){
            return res.status(401).json({error:'No token provided'});
        }
        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET, { expiresIn: '48h' })
            req.user=decode; // Attach decoded user info to request object
            next();
        }catch{
            console.error('Invalid token');
            res.status(401).json({error:'Invalid token'});
        }

    }

    //Function to generate JWT token
const generateToken=(userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET);
}

module.exports={jwtAuthMiddleware,generateToken};