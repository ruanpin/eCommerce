import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Loading from '@/components/Loading'
import FrontLayout from './layouts/FrontLayout';
import AdminLayout from './layouts/AdminLayout';

// 前台頁面
const Home = lazy(() => import('./pages/forestage/Home'));
// const ProductList = lazy(() => import('./pages/forestage/ProductList'));
// const ProductDetail = lazy(() => import('./pages/forestage/ProductDetail'));
// const Cart = lazy(() => import('./pages/forestage/Cart'));
// const Order = lazy(() => import('./pages/forestage/Order'));
// const UserProfile = lazy(() => import('./pages/forestage/UserProfile'));
// const Login = lazy(() => import('./pages/forestage/Login'));
// const Register = lazy(() => import('./pages/forestage/Register'));

// 管理員後台頁面
// const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
// const Users = lazy(() => import('./pages/admin/Users'));
// const Products = lazy(() => import('./pages/admin/Products'));
// const Orders = lazy(() => import('./pages/admin/Orders'));
// const Coupons = lazy(() => import('./pages/admin/Coupons'));
// const Reviews = lazy(() => import('./pages/admin/Reviews'));
// const Rankings = lazy(() => import('./pages/admin/Rankings'));
// const Banners = lazy(() => import('./pages/admin/Banners'));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* 前台 */}
          <Route path="/" element={<FrontLayout />}>
            <Route index element={<Home />} />
            {/* <Route path="products" element={<ProductList />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="orders" element={<Order />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} /> */}
          </Route>
          
          {/* 後台 */}
          <Route path="/admin" element={<AdminLayout />}>
            {/* <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="coupons" element={<Coupons />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="rankings" element={<Rankings />} />
            <Route path="banners" element={<Banners />} /> */}
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
