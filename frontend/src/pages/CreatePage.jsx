import { useState } from 'react';
import Input from '../components/Input';
import { useProductStore } from '../store/product';
import { ToastContainer, toast } from 'react-toastify';

const productItem = {
  name: '',
  price: '',
  image: '',
};

function CreatePage() {
  const [newProduct, setNewProduct] = useState(productItem);

  const { createProducts } = useProductStore();

  const handleProject = async () => {
    const { success, message } = await createProducts(newProduct);
    if (success) {
      toast.success(message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.error(message, {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    setNewProduct(productItem);
  };
  return (
    <div className="w-150 mx-auto text-center ">
      <h1 className="mb-12 font-bold text-4xl text-center text-secondary">Create New Product</h1>
      <div className="bg-base-200 p-4 rounded-xl">
        <Input
          name="product"
          label={'Product name'}
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <Input
          name="price"
          label={'price'}
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <Input
          name="image"
          label={'image url'}
          value={newProduct.image}
          capitalize={false}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        />
        <button
          className="text-2xl bg-secondary rounded-md px-3 py-2 w-full mt-4 cursor-pointer"
          onClick={handleProject}
        >
          Add Product
        </button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default CreatePage;
