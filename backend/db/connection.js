import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI

const connect = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log(`Database connection established`);
    } catch (error) {
        console.error(`Error connecting to database: ${error}`);
    }
}

export default connect;