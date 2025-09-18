import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

dotenv.config();
connectDB(); // Pastikan ini ada

const app = express();

app.use(express.json());

app.use('/api/products', productRoutes);

// Ini adalah satu-satunya yang kamu butuhkan untuk Vercel
export default app;
