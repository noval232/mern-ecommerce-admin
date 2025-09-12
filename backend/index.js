import ekspres from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

dotenv.config();
connectDB();

const app = ekspres();
const __dirname = path.resolve();

app.use(ekspres.json());
app.use('/api/products', productRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(ekspres.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
  });
}

export default app;
