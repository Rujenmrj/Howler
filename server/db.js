import mongoose from 'mongoose';    

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://rujenmrj15:rujen15mrj@cluster0.jbkuv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
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
  poster: {type: String, required: true},
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});


const Howl = mongoose.model('Howl', HowlSchema);
const User = mongoose.model('User', UserSchema);

export default connectDB;
export { Howl, User };
