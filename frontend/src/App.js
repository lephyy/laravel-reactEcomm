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

import Product from "./admin/Product";
import Login from "./admin/Login";

import { ToastContainer, toast } from 'react-toastify';
import AdminRoute from './admin/components/AdminRoute';

import {default as ShowCategories} from "./admin/category/Show";
import {default as CreateCategory} from "./admin/category/Create";
import {default as EditCategory} from "./admin/category/Edit";

import {default as ShowBrands} from "./admin/brand/Show";
import {default as CreateBrand} from "./admin/brand/Create";
import {default as EditBrand} from "./admin/brand/Edit";

import {default as ShowProducts} from "./admin/product/Show";
import {default as CreateProduct} from "./admin/product/Create";
import {default as EditProduct} from "./admin/product/Edit";


import { AuthProvider } from './components/Auth';
import Register from './pages/Register';
import {default as UserLogin} from'./pages/Login';
import Profile from './pages/Profile';
import { RequireAuth } from './pages/RequireAuth';
import { COD } from './components/COD';
import ShowOrders from './admin/orders/ShowOrders';
import OrderDetail from './admin/orders/OrderDetail';


function App() {
  return (
    <AuthProvider>  
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/*User*/}
          <Route path='/' element={<Home />} />
          <Route path='/shopcategory' element={<ShopCategory />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/tracking' element={<Tracking />} />
          <Route path='/checkout' element={<RequireAuth><CheckOut /></RequireAuth>} />
          <Route path="/payment" element={<RequireAuth><Payment /></RequireAuth>} />
          <Route path="/cashondelivery" element={<RequireAuth><COD /></RequireAuth>} />
          <Route path="/order/confirmation/:id" element={<RequireAuth><Confirmation /></RequireAuth>} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/confirmation' element={<Confirmation />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/singleblog' element={<SingleBlog />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/history' element={<History />} />

          <Route path='/account/register' element={<Register />} />
          <Route path='/account/login' element={<UserLogin />} />
          <Route path="/account" element={<RequireAuth><Profile/></RequireAuth>} />

          {/* Admin */}
          <Route path='/login' element={<Login />} />
          
          <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />

          <Route path="/admin/banner" element={<AdminRoute><Banner /></AdminRoute>} />
          
          <Route path="/admin/product" element={<AdminRoute><Product /></AdminRoute>} />

          <Route path="/admin/categories" element={<AdminRoute><ShowCategories /></AdminRoute>} />
          <Route path="/admin/categories/create" element={<AdminRoute><CreateCategory /></AdminRoute>} />
          <Route path="/admin/categories/edit/:id" element={<AdminRoute><EditCategory /></AdminRoute>} />

          <Route path="/admin/brands" element={<AdminRoute><ShowBrands /></AdminRoute>} />
          <Route path="/admin/brands/create" element={<AdminRoute><CreateBrand /></AdminRoute>} />
          <Route path="/admin/brands/edit/:id" element={<AdminRoute><EditBrand /></AdminRoute>} />

          <Route path="/admin/products" element={<AdminRoute><ShowProducts /></AdminRoute>} />
          <Route path="/admin/products/create" element={<AdminRoute><CreateProduct /></AdminRoute>} />
          <Route path="/admin/products/edit/:id" element={<AdminRoute><EditProduct /></AdminRoute>} />

          <Route path="/admin/orders" element={<AdminRoute><ShowOrders /></AdminRoute>} />
          <Route path="/admin/orders/:id" element={<AdminRoute><OrderDetail /></AdminRoute>} />


        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </CartProvider>
    </AuthProvider> 
  );
}

export default App;
