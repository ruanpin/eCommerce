import AccountSidebar from './components/AccountPanel'
import { useState, Suspense } from 'react'
import Loading from '@/components/Loading'
import Detail from './components/AccountDetail'
import OrderManagement from './components/OrderManagement'

const componentMap = {
    Details: Detail,
    OrderManagement: OrderManagement
}

export default function UserInfo() {
    const [tab, setTab] = useState("Details")
    const Component = componentMap[tab as keyof typeof componentMap]
    return (
        <div className="w-full p-6 flex justify-center flex-wrap max-w-[1440px] md:flex-row mx-auto">
            <AccountSidebar tab={tab} setTab={setTab}></AccountSidebar>
            <Suspense fallback={<Loading />}>
                <Component />
            </Suspense>
        </div>
    )
}