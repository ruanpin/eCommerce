import { useState, useEffect, useRef } from "react";
import MyInput from '@/components/MyInput'
import { useLazyGetUserDetailsQuery } from '@/redux/services/api'
import { toast } from "sonner"

export default function AccountDetails() {
  const [getUserDetails] = useLazyGetUserDetailsQuery();
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: ""
  })
  const isMounted = useRef(false)
  const fetchUserDetails = async () => {
    try {
      const result = await getUserDetails().unwrap()
      const data = result?.data ?? {}

      setDetails(() => ({
        name: data.name,
        email: data.email,
        phone: data.phone ?? ""
      }))
    } catch(err) {
      console.error(err)
      toast.warning(`${JSON.stringify(err)}`)
    }
  }
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      fetchUserDetails()
    }
  }, [])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDetails((prev) => ({
      ...prev,
      [name]: value
    }))
  }
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
                placeholder="Name*"
                name="name"
                autoComplete="name"
                required
                value={details.name}
                onChange={handleFormChange}
            />
            <MyInput
                className="p-3 border border-gray-300 rounded-lg h-[50px] border-solid focus:ring focus:ring-black"
                type="text"
                placeholder="email address*"
                name="email"
                autoComplete="email"
                required
                value={details.email}
                onChange={handleFormChange}
            />
            <MyInput
                className="p-3 border border-gray-300 rounded-lg h-[50px] border-solid focus:ring focus:ring-black"
                type="text"
                placeholder="Phone"
                name="phone"
                autoComplete="phone"
                required
                value={details.phone}
                onChange={handleFormChange}
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