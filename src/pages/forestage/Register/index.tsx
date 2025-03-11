// import { useState } from "react";
import Link from '@/components/Link'
import MyInput, { MyPasswordInput } from "@/components/MyInput"

export default function Register() {
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
                                type="email"
                                placeholder="email address*"
                                name="email"
                                autoComplete="email"
                                required
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
                            />
                        </div>
                        <div className="flex items-center gap-2">
                        <input type="checkbox" id="login-form_agree" className="w-4 h-4" />
                        <label htmlFor="login-form_agree" className="text-gray-600 text-sm">
                            I agree to the
                        </label>
                        <div className="hover:underline">
                            Terms of User
                        </div>
                        </div>
                        <div>
                        <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition" type="submit">
                            Register
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