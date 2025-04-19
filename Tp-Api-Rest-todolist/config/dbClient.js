import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.USERDB}:${process.env.PASSMONGODB}@${process.env.SERVERDB}/?retryWrites=true&w=majority&appName=todocluster`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conectado a MongoDB');
  } catch (err) {
    console.error('Error al conectar a MongoDB:', err.message);
    process.exit(1);
  }
};

export default connectDB;
