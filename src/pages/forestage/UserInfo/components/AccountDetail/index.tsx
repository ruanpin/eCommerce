// import { useState } from "react";
import MyInput from '@/components/MyInput'

export default function AccountDetails() {
  return (
    <div className="bg-white flex-col flex flex-1 min-w-[350px] rounded-lg p-6 m-4">
      <h2 className="text-2xl font-semibold mb-4">Account Details</h2>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Information</h3>
          <div className="flex flex-col gap-4">
            <MyInput
                className="p-3 border border-gray-300 rounded-lg h-[50px] border-solid focus:ring focus:ring-black"
                type="text"
                placeholder="First Name*"
                required
            />
            <MyInput
                className="p-3 border border-gray-300 rounded-lg h-[50px] border-solid focus:ring focus:ring-black"
                type="text"
                placeholder="Last Name*"
                required
            />
            <MyInput
                className="p-3 border border-gray-300 rounded-lg h-[50px] border-solid focus:ring focus:ring-black"
                type="text"
                placeholder="email address*"
                required
            />
            <MyInput
                className="p-3 border border-gray-300 rounded-lg h-[50px] border-solid focus:ring focus:ring-black"
                type="text"
                placeholder="Phone*"
                required
            />
          </div>
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700">
          Update Account
        </button>
      </form>
    </div>
  );
}