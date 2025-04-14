import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import ShopCategory from './pages/ShopCategory';
import ProductDetails from './pages/ProductDetails';
// import Login from './pages/Login';
import Tracking from './pages/Tracking';
import CheckOut from './pages/CheckOut';
import Cart from './pages/Cart';
import Blog from './pages/Blog';
import Confirmation from './pages/Confirmation';
import SingleBlog from './pages/SingleBlog';
import Contact from './pages/Contact';
import { CartProvider, CartContext } from './components/CartContext';
import Payment from './components/Payment';
import History from './pages/History';
import Header from './components/Header';
// Admin
import Admin from "./admin/Admin";
import Banner from "./admin/Banner";
import Categories from "./admin/Categories";
import Product from "./admin/Product";
import Login from "./admin/Login";

import { ToastContainer, toast } from 'react-toastify';
import AdminRoute from './admin/components/AdminRoute';



function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shopcategory' element={<ShopCategory />} />
          <Route path='/singleproduct/:id' element={<ProductDetails />} />
          {/* <Route path='/login' element={<Login />} /> */}
          <Route path='/tracking' element={<Tracking />} />
          <Route path='/checkout' element={<CheckOut />} />
          <Route path="/payment" element={<Payment />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/confirmation' element={<Confirmation />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/singleblog' element={<SingleBlog />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/history' element={<History />} />



          {/* Admin */}
          <Route path='/login' element={<Login />} />
          
          <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />

          <Route path="/admin/banner" element={<AdminRoute><Banner /></AdminRoute>} />
          <Route path="/admin/categories" element={<AdminRoute><Categories /></AdminRoute>} />
          <Route path="/admin/product" element={<AdminRoute><Product /></AdminRoute>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </CartProvider>
  );
}

export default App;
