import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI
let cached = (global as any).mongoose || {conn: null, promise: null};

export const connectionToDatabase = async () =>{
    if(cached.conn) return cached.conn;

    if(!MONGODB_URI) throw new Error("Mongoose is not connected.");

    cached.promise = cached.promise || mongoose.connect(MONGODB_URI,{
        dbName: "event-management-system",
        bufferCommands: false,
    })

    cached.conn = await cached.promise;

    return cached.conn;
}