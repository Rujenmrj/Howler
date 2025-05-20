import mongoose from 'mongoose';    

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://howler:secret123@localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

    console.log('MongoDB connected 🌐');
  } catch (err) {
    console.error('MongoDB connection failed ❌', err);
    process.exit(1);
  }
};





const HowlSchema = new mongoose.Schema({
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});





export default connectDB;
export { HowlSchema, UserSchema };
