import mongoose from 'mongoose';
import Product from '../models/product.model.js';

// Dokumentasi atau catatan code ada di paling bawah

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
    console.log('error in fetching products: ', err.message);
  }
};

export async function createProduct(req, res) {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ success: false, message: 'Data tidak lengkap' });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (err) {
    console.log('Error create product: ', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ status: false, message: 'ID Tidak Valid' });
  }

  try {
    const updateProduct = await Product.findByIdAndUpdate(id, product, { new: true });
    res.status(200).json({ success: true, data: updateProduct });
  } catch (err) {
    console.log('ada error: ' + err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ status: false, message: 'Invalid Prodcut ID' });
  }

  try {
    await Product.findByIdAndDelete(id); // ini adalah method dari mongoose untuk menghapus data berdasarkan id
    res.status(200).json({ success: 'true', message: 'Product Terhapus' });
  } catch (err) {
    res.status(500).json({ success: 'false', message: 'Server Error' });
    console.log('ada error: ' + err);
  }
};

/* ============================================================= Catatan ============================================================ */

//1.  const products = await Product.find({});
//  method dari mongoose untuk mengambil semua data dari collection products

//2  xx.get("/url", (req,res)=>);
// selain request ada juga response yang berfungsi untuk mengirim data ke client
// request dan response itu adalah objek yang berisi informasi tentang request dan response yang dikirimkan oleh client
// request itu berisi informasi tentang request yang dikirimkan oleh client, seperti method, url, headers, body, dll
// response itu berisi informasi tentang response yang akan dikirimkan ke client, seperti status code, headers, body, dll

//3. const { id } = req.params;
//apa bedanya req.params dan req.body? req.params itu untuk mengambil data dari url, sedangkan req.body itu untuk mengambil data dari body request
//jadi req.body itu data yang dikirimkan oleh client, sedangkan req.params itu data yang ada di url
//lalu searchParams bedanya apa dengan params? searchParams itu data yang ada di url setelah tanda tanya (?), sedangkan params itu data yang ada di url sebelum tanda tanya (?)
// fungsi tanda tanya (?) itu adalah untuk memisahkan antara path dan query string

//4. !mongoose.Types.ObjectId.isValid(id)
//id tidak valid itu maksudnya id yang dikirim dari client itu bukan id yang ada di database, dan 'Types.ObjectId.isValid()' itu adalah method dari mongoose untuk mengecek apakah id yang dikirim dari client itu valid atau tidak
//'Types.ObjectId.isValid()' ini kalau di sql itu seperti 'SELECT * FROM products WHERE id = ?' untuk mengecek apakah id yang dikirim dari client itu ada di database atau tidak

// const updateProduct = await Product.findByIdAndUpdate(id, product, { new: true });
//'findByIdAndUpdate(id, product, { new: true })' ini adalah method dari mongoose untuk mengupdate data berdasarkan id, dan {new: true} itu untuk mengembalikan data yang sudah diupdate
//kalau tidak pake {new: true}, maka yang dikembalikan adalah data sebelum diupdate

// await Product.findByIdAndDelete(id);
// ini adalah method dari mongoose untuk menghapus data berdasarkan id

//  kontroller adalah callback function yang akan dijalankan ketika ada request ke route tertentu
// karena controller itu adalah fungsi yang akan dijalankan ketika ada request ke route tertentu
//jadi controller itu adalah fungsi yang berisi logika untuk menangani request dan response
//jadi controller itu adalah
