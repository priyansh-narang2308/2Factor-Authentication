import { connect } from "mongoose";

const dbConnect = async () => {
  try {
    const mongoConnection = await connect(process.env.MONGODB_URL);
    console.log(
      `Database connected Successfully: ${mongoConnection.connection.host}`
    );
  } catch (error) {
    console.log(`Database Connection Failed: ${error}`);
    process.exit(1);
  }
};

export default dbConnect;
