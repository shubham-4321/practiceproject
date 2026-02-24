const mongoose = require("mongoose")

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        mongoose.connection.once("open", () => {
            console.log("Connected to DB:", mongoose.connection.name);
        });
        console.log("MongoDb connected Successfully");
    }
    catch (error) {
        console.error("Mongo Error:", error.message);
        process.exit(1)
    }
}

module.exports = connectDb
