import { useState, useEffect } from "react";
import Link from '@/components/Link'
import MyInput, { MyPasswordInput } from "@/components/MyInput"
import { toast } from "sonner"
import { Loader2 } from 'lucide-react';
import { getUnfilledFields } from '@/utils/objectCheck'
import { useLoginMutation } from '@/redux/services/api'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from '@/redux/store';

export interface userLogin {
  email: string,
  password: string
}

const remember_email = localStorage.getItem('login_email')

export default function Login() {
  const nextRoutePath = useSelector<RootState>(state => state.auth.nextRoutePath);
  const navigate = useNavigate();
  const [buttonLoading, setButtonLoading] = useState<boolean>(false)
  const [userLogin, setUserLogin] = useState<userLogin>({
    email: "",
    password: ""
  })
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserLogin((prev) => ({
        ...prev,
        [name]: value
    }))
  }
  const [isRemember, setIsRemember] = useState<boolean>(false)
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    setIsRemember(() => (checked))
  }

  const [login] = useLoginMutation();
  const handleLogin = async () => {
    const unfilledFieldsArr = getUnfilledFields(userLogin)
    if (unfilledFieldsArr.length > 0) {
        for (const value of unfilledFieldsArr) {
            toast.error(`Please fill in the ${value} field.`)
        }
        return
    }
    setButtonLoading(() => true)

    try {
      const result = await login(userLogin).unwrap();
      console.log('login successful', result);
      toast.success('login success')
      
      if (isRemember) localStorage.setItem('login_email', userLogin.email);
      else localStorage.removeItem('login_email')
      
      setUserLogin(() => ({
        email: "",
        password: "",
      }))
      navigate(nextRoutePath ?? '/')
    } catch (err) {
      console.error('login failed', err);
    } finally {
      setButtonLoading(() => false)
    }

  }

  useEffect(() => {
    if (remember_email) {
      setIsRemember(() => (true))
      setUserLogin((prev) => ({
        ...prev,
        email: remember_email
      }))
    }
  }, [])

  return (
    <section className="flex items-center justify-center py-16 px-4">
      <div className="max-w-[1440px] mx-auto bg-white rounded-lg p-4 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="mb-6">
            <h4 className="text-[24px] sm:text-[26px] md:text-[30px] font-semibold">Login</h4>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
                type="email"
                placeholder="Username or email address*"
                name="email"
                required
              />
            </div>
            <div>
              <MyInput
                  className="p-3 border border-gray-300 rounded-lg h-[50px]"
                  type="email"
                  placeholder="email address*"
                  name="email"
                  autoComplete="email"
                  required
                  value={userLogin.email}
                  onChange={handleFormChange}
              />
            </div>
            <div className="relative">
              <MyPasswordInput
                  className="p-3 border border-gray-300 rounded-lg h-[50px]"
                  type="password"
                  placeholder="Password*"
                  name="password"
                  autoComplete="current-password"
                  required
                  value={userLogin.password}
                  onChange={handleFormChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="login-form_agree"
                  className="w-4 h-4"
                  checked={isRemember}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="login-form_agree" className="text-gray-600 text-sm">
                  Remember me
                </label>
              </div>
              <Link href="/login" className="hover:underline text-sm">
                Forgot Your Password?
              </Link>
            </div>
            <div>
              <button
                className="w-full bg-black text-white py-3 rounded-lg flex justify-center"
                type="submit"
                onClick={handleLogin}
                disabled={buttonLoading}
              >
                {
                  buttonLoading ? <Loader2 className="animate-spin text-white" /> : 'Login'
                }
              </button>
            </div>
          </form>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-[24px] sm:text-[26px] md:text-[30px] font-semibold mb-2">New Customer</h4>
          <p className="text-gray-600 mb-4">
            Be part of our growing family of new customers! Join us today and unlock a world of exclusive benefits, offers, and personalized experiences.
          </p>
          <div className="flex">
              <Link href="/register" className="block w-full md:w-auto bg-black text-white py-3 px-6 rounded-lg transition text-center font-medium">
                  Register
              </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
  