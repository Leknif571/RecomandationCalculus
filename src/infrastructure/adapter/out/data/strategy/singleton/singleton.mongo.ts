import mongoose, { ConnectOptions } from "mongoose";

export default class SingletonMongo {
    private static _instance: SingletonMongo;
    private connection?: mongoose.Connection;
    private readonly defaultUri: string;

    private constructor() {
        this.defaultUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/calculus_recommendation";
        mongoose.set("strictQuery", false);
    }

    public static getInstance(): SingletonMongo {
        if (!SingletonMongo._instance) {
            SingletonMongo._instance = new SingletonMongo();
        }
        return SingletonMongo._instance;
    }

    public async connect(uri?: string, options: ConnectOptions = {}): Promise<mongoose.Connection> {
        const target = uri || this.defaultUri;
        if (mongoose.connection.readyState === 1) {
            this.connection = mongoose.connection;
            return this.connection;
        }
        await mongoose.connect(target, options as any);
        this.connection = mongoose.connection;
        return this.connection;
    }

    public async disconnect(): Promise<void> {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
            this.connection = undefined;
        }
    }

    public getConnection(): mongoose.Connection | undefined {
        return this.connection;
    }
}

