import jwt from "jsonwebtoken"

const authMiddleware = async (req,res,next)=>{
const {token}= req.headers;
if(!token){
    return res.json({success:false,message:"not autorized login again"})
}
try {
    const token_decode = jwt.verify(token,process.env.SECRET_KEY);
    req.body.userId = token_decode.id;
    next();
} catch (error) {
    console.log(error);
    res.json({success:false,message:"error"})
}
}
export default authMiddleware