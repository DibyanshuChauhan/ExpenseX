import mongoose from 'mongoose';
import dns from 'dns';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/expensex';

  // Only configure custom DNS for cloud SRV strings if not local
  if (uri.startsWith('mongodb+srv://')) {
    try {
      dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
    } catch (e) {
      console.warn('Could not set custom DNS servers:', e.message);
    }
  }

  const maxRetries = 3;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return true;
    } catch (error) {
      console.error(`MongoDB Connection Attempt ${attempt}/${maxRetries} failed: ${error.message}`);
      if (attempt < maxRetries) {
        console.log('Retrying database connection in 1.5 seconds...');
        await new Promise((r) => setTimeout(r, 1500));
      }
    }
  }

  console.error('Failed to establish MongoDB connection after multiple attempts.');
  return false;
};
