const mongoose = require("mongoose")

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            tls: true,
            tlsAllowInvalidCertificates: true,
        });
        console.log("MongoDb connected Successfully");
    }
    catch (error) {
        console.error("Mongo Error:", error.message);
        process.exit(1)
    }
}

module.exports = connectDb
