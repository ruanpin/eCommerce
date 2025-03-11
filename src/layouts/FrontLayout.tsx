import { useState } from 'react'
import { Outlet } from 'react-router-dom';
import Broadcast from '@/components/Broadcast'
import Header from '@/components/Header'

export default function FrontLayout() {
    const [isShowBroadcase, setIsShowBroadcase] = useState<boolean>(true)
    const [isBroadcaseWillBeUnmounted, setIsBroadcaseWillBeUnmounted] = useState<boolean>(false)

    return (
      <div className="flex flex-col min-h-screen">
        { isShowBroadcase
          && <Broadcast
                setIsShowBroadcase={setIsShowBroadcase}
                isBroadcaseWillBeUnmounted={isBroadcaseWillBeUnmounted}
                setIsBroadcaseWillBeUnmounted={setIsBroadcaseWillBeUnmounted}
              />
        }
        <div className={`
            transition-all duration-800 overflow-hidden flex flex-col
            ${isBroadcaseWillBeUnmounted ? 'mt-0' : 'mt-[42px]'}
          `}
        >
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          {/* <footer className="bg-gray-800 text-white text-center">Footer</footer> */}
        </div>
      </div>
    );
  }