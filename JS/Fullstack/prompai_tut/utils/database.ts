import mongoose, { ConnectOptions, mongo } from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Already connected to DB");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    isConnected = true;
    console.log("DB Connected.");
  } catch (error) {
    console.log(error);
  }
};
