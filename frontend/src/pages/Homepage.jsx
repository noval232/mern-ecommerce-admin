import { Outlet } from 'react-router-dom';
import Navbar from './../components/Navbar';

function Homepage() {
  return (
    <div>
      <Navbar />
      <main className="max-w-7xl py-4 mx-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default Homepage;
