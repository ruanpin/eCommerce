// import { useState } from "react";
import Link from '@/components/Link'
import MyInput, { MyPasswordInput } from "@/components/MyInput"

export default function Login() {
    return (
      <section className="flex items-center justify-center py-16 px-4">
        <div className="max-w-[1440px] mx-auto bg-white rounded-lg p-4 flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="mb-6">
              <h4 className="text-[24px] sm:text-[26px] md:text-[30px] font-semibold">Login</h4>
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="login-form_agree" className="w-4 h-4" />
                  <label htmlFor="login-form_agree" className="text-gray-600 text-sm">
                    Remember me
                  </label>
                </div>
                <Link href="/login" className="hover:underline text-sm">
                  Forgot Your Password?
                </Link>
              </div>
              <div>
                <button className="w-full bg-black text-white py-3 rounded-lg" type="submit">
                  Login
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
  