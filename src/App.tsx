import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import Loading from '@/components/Loading'
import FrontLayout from './layouts/FrontLayout';
import AdminLayout from './layouts/AdminLayout';
import { PrivateRoute, PublicRoute } from './router/routesSetting';
import { useDispatch } from 'react-redux';
import { setUserLoginStatus_fromLocalStorage } from '@/redux/slices/authSlice'

// 前台頁面
const Home = lazy(() => import('./pages/forestage/Home'));
// const ProductList = lazy(() => import('./pages/forestage/ProductList'));
// const ProductDetail = lazy(() => import('./pages/forestage/ProductDetail'));
// const Cart = lazy(() => import('./pages/forestage/Cart'));
// const Order = lazy(() => import('./pages/forestage/Order'));
const UserInfo = lazy(() => import('./pages/forestage/UserInfo'));
const Register = lazy(() => import('./pages/forestage/Register'));
const Login = lazy(() => import('./pages/forestage/Login'));
const Search = lazy(() => import('./pages/forestage/Search'));
const ProductDetail = lazy(() => import('./pages/forestage/ProductDetail'));
const ShoppingCart = lazy(() => import('./pages/forestage/ShoppingCart'));
const OrderManagement = lazy(() => import('./pages/forestage/OrderManagement'));

// 管理員後台頁面
// const Dashboard = lazy(() => import('./pages/backstage/Dashboard'));
// const Users = lazy(() => import('./pages/backstage/Users'));
// const Products = lazy(() => import('./pages/backstage/Products'));
// const Orders = lazy(() => import('./pages/backstage/Orders'));
// const Coupons = lazy(() => import('./pages/backstage/Coupons'));
// const Reviews = lazy(() => import('./pages/backstage/Reviews'));
// const Rankings = lazy(() => import('./pages/backstage/Rankings'));
// const Banners = lazy(() => import('./pages/backstage/Banners'));

const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const dispatch =  useDispatch()
  useEffect(() => {
    dispatch(setUserLoginStatus_fromLocalStorage())
  }, [dispatch])
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* 前台 */}
          <Route path="/" element={<FrontLayout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="productDetail" element={<ProductDetail />} />
            <Route path="dev" element={<OrderManagement />} />
            {/* <Route path="products" element={<ProductList />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="orders" element={<Order />} /> */}
            {/* 僅無權限時（無登入時） */}
            <Route element={<PublicRoute />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            {/* 僅有權限時（登入時） */}
            <Route element={<PrivateRoute />}>
              <Route path="userInfo" element={<UserInfo />} />
              <Route path="shoppingCart" element={<ShoppingCart />} />
            </Route>
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

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
