import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/authSlice'
export default function UserInfo() {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <>
            <div>UserInfo</div>
            <button onClick={handleLogout}>登出</button>
        </>
    )
}