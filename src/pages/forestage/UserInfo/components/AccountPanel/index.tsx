import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/slices/authSlice'
import { User, ShoppingBag, LogOut } from 'lucide-react';
import { RootState } from '@/redux/store';

export default function AccountSidebar({ tab, setTab }: { tab: string, setTab: (value: string) => void}) {
  const dispatch = useDispatch();
  const { name, email } = useSelector((state: RootState) => state.auth)
  const handleLogout = () => {
      dispatch(logout())
  }
  const handleSwitchTab = (value: string) => {
    setTab(value)
  }
  console.log(setTab)
  const menu = [
    { value: "Details", label: "Account Details", icon: User },
    { value: "OrderManagement", label: "Your Orders", icon: ShoppingBag },
  ]
  return (
    <div className="w-full max-w-xs min-w-[302px] flex-col flex bg-[#F7F7F7] rounded-lg p-6 m-4 h-[425px]">
      <div className="flex flex-col items-center text-center">
        <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-300 bg-gray-300">
          {/* <Image
            alt="User Avatar"
            src="/images/avatar/user-account.jpg"
            width={112}
            height={112}
          /> */}
        </div>
        <h6 className="mt-4 text-lg font-semibold">{ name }</h6>
        <p className="text-gray-500 text-sm">{ email }</p>
      </div>
      <ul className="mt-6 space-y-4 font-semibold">
        {
          menu.map(({ value, label, icon }) => {
            const Component = icon
            // onClick={() => setTab(value)}
            return (
              <li key={value} onClick={() => handleSwitchTab(value)}>
                <div
                  className={`
                    flex items-center px-4 py-3 rounded-lg transition-all hover:bg-white cursor-pointer whitespace-nowrap
                    ${tab === value ? 'bg-white' : ''}
                  `}
                >
                  <span className="w-6 h-6 mr-3 flex items-center justify-center">
                    <Component
                      width={24}
                      height={24}
                    />
                  </span>
                  {label}
                </div>
              </li>
            )
          })
        }
        <li onClick={handleLogout}>
          <div
            className={`flex items-center px-4 py-3 rounded-lg transition-all hover:bg-white cursor-pointer whitespace-nowrap`}
          >
            <span className="w-6 h-6 mr-3 flex items-center justify-center">
              <LogOut
                width={24}
                height={24}
              >
              </LogOut>
            </span>
            Logout
          </div>
        </li>
      </ul>
    </div>
  );
}