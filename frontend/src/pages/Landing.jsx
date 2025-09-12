import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { ToastContainer } from 'react-toastify';

/* const loader = async ({ request }) => {
  
 const res = await();
}; */

function Landing() {
  const { fetchProducts, products, deleteProduct } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <header>
        <h1 className="mb-12 font-bold text-4xl text-center  text-secondary">Our Boots</h1>
      </header>
      {!products?.length === 0 && (
        <div className="font-semibold">
          <div className="my-4">
            <span className="text-2xl">No Products found, </span>
            <div className="lg:tooltip tooltip-bottom" data-tip="Link to product page">
              <Link className=" text-secondary text-2xl underline" to="/create">
                Create a Product
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className=" grid place-items-center sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 px-2 gap-20 ">
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
        <ToastContainer />
      </div>
    </>
  );
}

export default Landing;
