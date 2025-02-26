import { useState } from 'react'
import './App.css'
import Broadcast from '@/components/Broadcast'

import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";

function App() {
  const [isShowBroadcase, setIsShowBroadcase] = useState<boolean>(true)
  const [isBroadcaseWillBeUnmounted, setIsBroadcaseWillBeUnmounted] = useState<boolean>(false)

  return (
    <>
      <div className={`w-[100%] overflow-hidden`}>
        { isShowBroadcase
          && <Broadcast
                setIsShowBroadcase={setIsShowBroadcase}
                isBroadcaseWillBeUnmounted={isBroadcaseWillBeUnmounted}
                setIsBroadcaseWillBeUnmounted={setIsBroadcaseWillBeUnmounted}
              />
        }
        <div className={`transition-all duration-800 overflow-hidden ${isBroadcaseWillBeUnmounted ? 'mt-0' : 'mt-[42px]'}`}>
          <RouterProvider router={router}></RouterProvider>
        </div>
      </div>
    </>
  )
}

export default App
