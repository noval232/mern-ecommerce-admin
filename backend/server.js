import ekspres from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = ekspres();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(ekspres.json());

app.use('/api/products', productRoutes);

console.log('MONGO URI JALAN: ', process.env.MONGO_URI);

if (process.env.NODE_ENV === 'production') {
  app.use(ekspres.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

//ini digunakan untuk membuat server di port 5000
//panggil fungsi connectDB untuk konek ke database
app.listen(PORT, () => {
  connectDB();
  console.log('Server running at http://localhost:' + PORT);
});

// Password mongoDB:g1O1U9ggC75I2hyK

// data dummy aja
// let menu = [
//   { id: 1, name: 'Margherita', price: 10 },
//   { id: 2, name: 'Pepperoni', price: 12 },
//   { id: 3, name: 'Margherita', price: 13 },
//   { id: 4, name: 'Pepperoni', price: 15 },
//   { id: 5, name: 'Margherita', price: 10 },
//   { id: 6, name: 'Pepperoni', price: 12 },
//   { id: 7, name: 'Margherita', price: 10 },
//   { id: 8, name: 'Pepperoni', price: 12 },
//   { id: 9, name: 'Margherita', price: 10 },
//   { id: 10, name: 'Pepperoni', price: 12 },
//   { id: 11, name: 'Margherita', price: 10 },
//   { id: 12, name: 'Pepperoni', price: 12 },
//   { id: 13, name: 'Margherita', price: 10 },
//   { id: 14, name: 'Pepperoni', price: 12 },
// ];

/* ================================================================== Catatan =========================================================== */

//fungsi nodemon
// nodemon itu adalah package yang digunakan untuk menjalankan server secara otomatis ketika ada perubahan di file js
// jadi kita tidak perlu lagi menghentikan server dan menjalankan lagi setiap kali ada perubahan di file js
// nodemon akan otomatis menghentikan server dan menjalankan lagi ketika ada perubahan di file js
// cara menggunakannya adalah dengan menjalankan perintah "npx nodemon nama_file.js" di terminal
// misalnya "npx nodemon backend/server.js"

//1.  import
// const express = require('express'); //ini cara lama

// import ekspres from 'express';
// import dotenv from 'dotenv';
// import { connectDB } from './config/db.js';
// import productRoutes from './routes/product.route.js';

//import modern syntax, untuk bisa pake ini, di package.json harus ditambahin "type": "module"
// mengapa kalau pake import, harus di package.json ditambahin "type": "module"?
// karena kalau tidak ditambahin, nodejs akan menganggap semua file js adalah commonjs, bukan module
// kalau commonjs, harus pake require, kalau module, harus pake import

// module adalah standar terbaru dari javascript, sedangkan commonjs adalah standar lama yang digunakan di nodejs
// module itu bawaan javascript, sedangkan commonjs adalah standar yang dibuat oleh nodejs
// module itu bisa diimport di browser, sedangkan commonjs tidak bisa diimport di browser

//2. dotenv.config();
//ini untuk membaca file .env
// kalau tidak dipanggil, maka env tidak akan terbaca

//3. const PORT = process.env.PORT || 5000;
//process ini adalah global object di nodejs yang berisi informasi tentang environment variable, dan env itu adalah object yang berisi semua variable yang ada di file .env

//4. app.use(ekspres.json());
//ini untuk mengizinkan server menerima request dengan format json di body
// kalau tidak pake ini, maka req.body akan undefined
//artinya setiap ada request masuk, maka akan diubah dulu ke format json sebelum masuk ke route handler

//5. app.use('/api/products', productRoutes);
//ini adalah route, artinya ketika ada request ke route "/api/products", maka akan dijalankan fungsi yang ada di dalam productRoutes
// dan di dalam productRoutes itu ada callback function dari masing2 method :"get, post, put, delete"

//6. console.log('MONGO URI JALAN: ', process.env.MONGO_URI);
//ini untuk mengecek apakah env sudah terbaca atau belum
//dotenv itu adalah package yang digunakan untuk membaca file .env
//install dulu package dotenvnya dengan perintah "npm install dotenv" di terminal
//jadi kalau kita ingin mengecek env bisa menggunakan process

//7. listen
/* app.listen(PORT, () => {
  connectDB(); 
}); */
// connectDB(); panggil fungsi connectDB untuk konek ke database
//ini digunakan untuk membuat server di port 5000
//panggil fungsi connectDB untuk konek ke database
