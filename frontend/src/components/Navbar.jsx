// import { Box, Container, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaPlusSquare, FaMoon, FaSun } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { IoMoon } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';
import { useProductStore } from '../store/product';

const getToHtml = document.documentElement;
const getStorage = localStorage.getItem('newItem') || getToHtml.getAttribute('data-theme');

function Navbar() {
  const [colorMode, setColorMode] = useState(getStorage);
  const { products } = useProductStore;

  const handleColorMode = () => {
    const newTheme = colorMode === 'dracula' ? 'light' : 'dracula';
    setColorMode(newTheme);
  };

  useEffect(() => {
    getToHtml.setAttribute('data-theme', colorMode);
    localStorage.setItem('newItem', colorMode);
  }, [colorMode]);

  console.log('isi produk ', products);
  return (
    <div className="bg-base ">
      <nav className="max-w-7xl flex justify-between items-center py-4 mx-auto border-b-2 border-purple-900">
        <span className="w-fit bg-linear-to-r from-purple-500 to-blue-600 py-2 text-transparent bg-clip-text font-extrabold tracking-tight">
          <Link to="/">
            <h1 className="text-xl border-1 border-b-info border-error rounded-xl pb-1 px-2 border-l-0">
              🛒 Product Store
            </h1>
          </Link>
        </span>
        <span className="flex">
          <button className="btn btn-ghost">
            <span className="text-2xl ">
              <Link to="/create">
                <FaPlusSquare />
              </Link>
            </span>
          </button>
          <button className="btn btn-ghost" onClick={handleColorMode}>
            <span className="text-2xl ">
              {colorMode == 'dracula' ? (
                <span className="tooltip tooltip-bottom" data-tip="light mode">
                  <FaMoon />
                </span>
              ) : (
                <span className=" tooltip tooltip-bottom" data-tip="dark mode">
                  <FaSun />
                </span>
              )}
            </span>
          </button>
        </span>
      </nav>
    </div>
  );
}

export default Navbar;
