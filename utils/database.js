import mongoose from 'mongoose';

let isConnected = false;

export const connectionTODB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('DB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'promptopia',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('DB is connected');
  } catch (error) {
    console.log(error);
  }
};
