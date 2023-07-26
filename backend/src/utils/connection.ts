import mongoose from "mongoose";

const connectToDB = () => {
  const MONGO_URL = process.env.MONGO_URL;

  mongoose
    .connect(MONGO_URL, { retryWrites: true, w: "majority" })
    .then(() => {
      console.log("Your db connected...");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connectToDB
