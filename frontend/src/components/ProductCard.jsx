import { FaEdit, FaTrash, FaTrashAlt } from 'react-icons/fa';
import { useProductStore } from '../store/product';
import { toast, ToastContainer } from 'react-toastify';
import Input from './Input';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const { _id: pid } = product;

  const [updatedProduct, setUpdatedProduct] = useState(product);

  const { deleteProduct, updateProduct } = useProductStore();

  const handleUpdateProduct = async (pid) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    // onClose();
  };

  const handleDeleteProduct = async (id) => {
    const { success, message } = await deleteProduct(id);
    if (success) {
      toast.success(id + ' ' + message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.error(message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  console.log('isi updated product: ', updatedProduct);

  return (
    <>
      <div className="card bg-base-100 w-96 h-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
        <figure className="perspective-dramatic">
          <img
            loading="lazy"
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover rounded-2xl"
            onError={(e) => {
              e.target.src = '/react.svg';
              e.target.onerror = null;
            }}
          />
        </figure>
        <div className="card-body sm:text-sm lg:text-xl">
          <h2 className="card-title sm:text-sm lg:text-xl">{product.name}</h2>
          <p className="font-bold  sm:text-sm lg:text-xl">${product.price}</p>
          <div className="card-action mt-3 flex justify-end gap-x-3">
            <div className="tooltip tooltip-primary" data-tip="Edit Product">
              <button
                className="btn btn-outline btn-info"
                onClick={(e) => {
                  setUpdatedProduct(product);
                  document.getElementById(pid).showModal();
                }}
              >
                <FaEdit className="sm:text-sm lg:text-xl" />
              </button>
              <dialog id={pid} className="modal">
                <div className="modal-box">
                  <h1 className="font-bold text-xl text-center font-extrabold my-4 mt-2 uppercase">Update Product</h1>
                  <div>
                    <form method="dialog">
                      <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={() => setUpdatedProduct(product)}
                      >
                        ✕
                      </button>
                      <div className="bg-base-200 p-4 rounded-xl">
                        <Input
                          name="product"
                          label={'Product name'}
                          value={updatedProduct.name}
                          onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                        />
                        <Input
                          name="price"
                          label={'price'}
                          value={updatedProduct.price}
                          onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                        />
                        <Input
                          name="image"
                          label={'image url'}
                          value={updatedProduct.image}
                          capitalize={false}
                          onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                        />
                      </div>
                      <div className="flex gap-x-4 mt-6">
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                        >
                          Update
                        </button>
                        <button className="btn btn-error">Cancel</button>
                      </div>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
            <div className="tooltip tooltip-secondary" data-tip="Delete Product">
              <button className="btn btn-outline btn-error " onClick={() => handleDeleteProduct(pid, updatedProduct)}>
                <FaTrash className="sm:text-sm lg:text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
