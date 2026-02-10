import mongoose, { Connection, Mongoose } from "mongoose";

const cache: {
  connection: Connection | null;
  promise: Promise<Mongoose> | null;
} = { connection: null, promise: null };

export async function connectionDb() {
  if (cache.connection) {
    return cache.connection;
  }
  if (!cache.promise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not defined");
    }
    cache.promise = mongoose.connect(uri, {
      directConnection: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
  }

  try {
    cache.connection = (await cache.promise).connection;
  } catch (error) {
    cache.promise = null;
    throw error;
  }

  return cache.connection;
}
