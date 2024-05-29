import mongoose from "mongoose"
export const connectDb=async()=>{
    await mongoose.connect('mongodb+srv://ansh1998722:tiwari666@cluster0.kvkuipo.mongodb.net/reactProject').then(()=>console.log("Db connected"));
}