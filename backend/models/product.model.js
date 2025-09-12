import { mongoose } from 'mongoose';

// schema mirip dengan pembuatan tabel di database sql.
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  }, //mengapa tidak ada id? karena mongoose akan otomatis menambahkan id di setiap data yang kita buat

  { timestamps: true } //ini untuk menambahkan createdAt dan updatedAt secara otomatis di database,ini adalah bawaan dari mongoose
);

const Product = mongoose.model('Product', productSchema); //ini adalah model, lalu jika kita ingin membuat isinya kita bisa menggunakan Product.create({name: 'nama produk', price: 100, image: 'link gambar'})

export default Product;
