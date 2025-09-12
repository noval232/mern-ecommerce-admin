import { create } from 'zustand';

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products: products }),
  createProducts: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: 'please fill in all fields.' };
    }
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });

    const data = await res.json();
    set((prev) => ({ products: [...prev.products, data.data] }));
    return { success: true, message: 'Product is created succesfully' };
  },
  fetchProducts: async () => {
    const res = await fetch('/api/products');
    const { data } = await res.json();
    set({ products: data });
  },
  deleteProduct: async (id) => {
    const res = await fetch(`api/products/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    set((prev) => {
      return { products: prev.products.filter((item) => item._id !== id) };
    });
    return { success: true, message: data.message };
  },
  updateProduct: async (id, updateProduct) => {
    const res = await fetch(`api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateProduct),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    set((prev) => ({ products: prev.products.map((item) => (item._id === id ? data.data : item)) }));
    return { success: true, message: data.message };
  },
}));

/* ==================================== note ==================================== */

//cuma buat update di ui direct
// tanpa ini perlu refresh.karena disini kita update data product di state, kalo di database pake api/fetch
/*     set((prev) => {
      return { products: prev.products.filter((item) => item._id !== id) }; 
    }); */

//  ini juga sama update di ui, jika id yg dipilih sama dengan id yang di server(data di server data up to date)
//      maka update atau isi products dengan data baru diserver immutable mirip push kalo gak sama ya tetep nilai products nya
/* set((prev) => ({ products: prev.products.map((item) => (item._id === id ? data.data : item)) })); */
