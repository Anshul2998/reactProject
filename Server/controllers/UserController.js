import userModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
//login user
const loginUser = async (req,res)=>{
 const {email,password}=req.body;
 try {
    const user = await userModel.findOne({email})
    if (!user) {
        return res.json({success:false,message:"user does not exist"})
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if (!isMatch) {
        return res.json({success:false,message:"invalid credentials"})
    }
    const token = createToken(user._id);
    res.json({success:true,token})
 } catch (error) {
    console.log(error);
    res.json({success:false,message:"error"})
 }
}

const createToken = (id)=>{
    // return jwt.sign({id},process.env.JWT_SCERET)
    return jwt.sign({id}, process.env.SECRET_KEY);
}

// register new user
const registerUser = async(req,res)=>{
    const {name,password,email} = req.body;
    try {
        // checking if user already registered or not
        const exist = await userModel.findOne({email});
        if(exist){
            return res.json({success:false,message:"User already registered"})
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"please enter a valid email"})
        }

        if (password.length<8) {
            return res.json({success:false, message:"please enter strong password"})
        }

        // encrypting user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        // creating new user
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
        // saving new user in db
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"ERROR"})
    }
}

export {loginUser,registerUser}