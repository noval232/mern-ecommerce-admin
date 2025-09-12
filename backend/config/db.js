import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('MONGODB sudah konek: ', conn.connection.host);
  } catch (err) {
    console.log('Ada error di db.js: ', err.message);
    process.exit(1); //ini untuk menghentikan aplikasi jika tidak bisa konek ke database , dan 0 artinya sukses, 1 artinya error
  }
};

/* ******************************************************* NOTE ********************************************************* */
// Password mongoDB:g1O1U9ggC75I2hyK
