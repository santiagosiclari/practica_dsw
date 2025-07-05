import mongoose from 'mongoose';

export class MongoDBClient {
    static async connect() {
        try {
            const conn = await mongoose.connect(process.env.MONGODB_URI, {
                dbName: process.env.MONGODB_DB_NAME,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            console.log(`MongoDB is connected: ${conn.connection.host}`);
        } catch (error) {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        }
    }
}