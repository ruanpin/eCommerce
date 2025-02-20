import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import Button from "@/components/ui/button";
import Broadcast from '@/components/Broadcast'

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
        <div className={`transition-all duration-800 ${isBroadcaseWillBeUnmounted ? 'mt-0' : 'mt-[40px]'}`}>content</div>
      </div>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button><Button>Click meClick me</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
