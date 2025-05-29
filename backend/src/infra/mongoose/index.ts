import mongoose from "mongoose";

export async function connectDb() {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri)
      throw new Error(
        "Unable to connect to mongo db due to missing env: MONGO_URI"
      );

    await mongoose.connect(uri);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
