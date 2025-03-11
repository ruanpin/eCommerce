import { useState } from "react";
import Link from '@/components/Link'
import MyInput, { MyPasswordInput } from "@/components/MyInput"
import { toast } from "sonner"
import { getUnfilledFields } from '@/utils/objectCheck'
import { Loader2 } from 'lucide-react';
import { useRegisterMutation } from '@/redux/services/api'
import { useNavigate } from "react-router-dom";

export interface UserRegister {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

export default function Register() {
    const navigate = useNavigate();
    const [buttonLoading, setButtonLoading] = useState<boolean>(false)
    const [userRegister, setUserRegister] = useState<UserRegister>({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUserRegister((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const [isAgree, setIsAgree] = useState<boolean>(false)
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target
        setIsAgree(() => (checked))
    }

    const [register] = useRegisterMutation();
    const handleRegister = async () => {
        if (!isAgree) return toast.warning("Please agree to the terms of use.")
        const unfilledFieldsArr = getUnfilledFields(userRegister)
        if (unfilledFieldsArr.length > 0) {
            for (const value of unfilledFieldsArr) {
                toast.error(`Please fill in the ${value} field.`)
            }
            return
        }
        if (userRegister.password !== userRegister.confirmPassword) return toast.error(`Your passwords do not match. Please check and try again.`)

        setButtonLoading(() => true)
        try {
            const {
                name,
                email,
                password
            } = userRegister

            const params = {
                name,
                email,
                password,
                role: "member"
            }

            const result = await register(params).unwrap();
            console.log('register successful', result);
            toast.success('register success')
            setUserRegister(() => ({
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            }))
            navigate('/login')
        } catch (err) {
            console.error('register failed', err);
        } finally {
            setButtonLoading(() => false)
        }
    }

    return (
        <section className="py-16 px-4">
            <div className="max-w-[1440px] mx-auto bg-white rounded-lg p-4 flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                    <div className="mb-6">
                        <h4 className="text-[24px] sm:text-[26px] md:text-[30px] font-semibold">Register</h4>
                    </div>
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                        <div>
                            <MyInput
                                className="p-3 border border-gray-300 rounded-lg h-[50px]"
                                type="text"
                                placeholder="name*"
                                name="name"
                                autoComplete="name"
                                required
                                value={userRegister.name}
                                onChange={handleFormChange}
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
                                value={userRegister.email}
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
                                value={userRegister.password}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div className="relative">
                            <MyPasswordInput
                                className="p-3 border border-gray-300 rounded-lg h-[50px]"
                                type="password"
                                placeholder="confirm password*"
                                name="confirmPassword"
                                autoComplete="current-password"
                                required
                                value={userRegister.confirmPassword}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="login-form_agree"
                                className="w-4 h-4" 
                                checked={isAgree}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="login-form_agree" className="text-gray-600 text-sm">
                                I agree to the
                            </label>
                            <div className="hover:underline">
                                Terms of User
                            </div>
                        </div>
                        <div>
                            <button
                                className="w-full text-white py-3 rounded-lg hover:bg-indigo-700 transition flex justify-center"
                                type="submit"
                                onClick={handleRegister}
                                disabled={buttonLoading}
                            >
                                {
                                    buttonLoading ? <Loader2 className="animate-spin text-white" /> : 'Register'
                                }
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h4 className="text-[24px] sm:text-[26px] md:text-[30px] font-semibold mb-2">Already have an account?</h4>
                    <p className="text-gray-600 mb-4">
                        Welcome back. Sign in to access your personalized experience, saved preferences, and more. We're thrilled to have you with us again!
                    </p>
                    <div className="flex">
                        <Link href="/login" className="block w-full md:w-auto bg-black text-white py-3 px-6 rounded-lg transition text-center font-medium">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}