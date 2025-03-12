import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // 這裡載入你 Redux store 類型
import { useDispatch } from 'react-redux';
import { setNextRoutePath } from '@/redux/slices/authSlice';
// 私有路由組件，未登入時會跳轉到 login 頁面
const PrivateRoute = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  dispatch(setNextRoutePath(location.pathname))
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  console.log(isAuthenticated, 'isAuthenticated')
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

// 公共路由組件，已登入時會跳轉到 userInfo 頁面
const PublicRoute = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/userInfo" />;
  }

  return <Outlet />;
};

export { PrivateRoute, PublicRoute };
