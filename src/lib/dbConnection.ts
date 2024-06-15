import mongoose from "mongoose";

type ConnectionObj = {
    isConnected?: number
}
const connection: ConnectionObj = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("database already connected");
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {})

        connection.isConnected = db.connections[0].readyState
        console.log("db connected successfully");


    } catch (error) {
        process.exit(1)

    }
}

export default dbConnect

