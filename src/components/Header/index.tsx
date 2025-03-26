import { Search, User, ShoppingBag } from 'lucide-react';
// import useWindowWidth from '@/hooks/useWindowWidth'
import logo from '@/assets/women-logo.svg'
import { useNavigate, useLocation } from "react-router-dom";

import styles from './index.module.scss'
import NotifyNumber from './components/NotifyNumber/index.tsx'
interface Tab {
    label: string,
    navigate: string
}
const tabs: Array<Tab> = [
    {label: "WOMEN", navigate: "/"},
    // {label: "MEN", navigate: "/MEN"},
    // {label: "KIDS", navigate: "/KIDS"},
    // {label: "FIND A STORE", navigate: "/"},
]


export default function Header() {
    // const windowWidth = useWindowWidth()
    // console.log(windowWidth)
    const navigate = useNavigate();
    
    return (
        <>
            <div className={`flex items-center justify-between ${styles.upperHeader}`}>
                <div className={`flex items-center flex-1`}>
                    <div className={`flex items-center justify-center`}>
                        {/* <AlignJustify className={`cursor-pointer`} size={28}/> */}
                    </div>
                </div>
                <div className={`flex justify-center items-center cursor-pointer ${styles.logoWidth}`} onClick={() => navigate('/')}>
                    <img src={logo}/>
                </div>
                <div className={`flex items-center flex-1 flex-row-reverse`}>
                    <div className={`flex items-center justify-center relative ${styles.iconContainer}`} onClick={() => navigate('/shoppingCart')}>
                        <ShoppingBag className={`cursor-pointer ${styles.icon}`} size={21}/>
                        <NotifyNumber amount={0}/>
                    </div>
                    {/* <div className={`flex items-center justify-center relative ${styles.iconContainer}`}>
                        <Heart className={`cursor-pointer ${styles.icon}`} size={21}/>
                        <NotifyNumber amount={2}/>
                    </div> */}
                    <div className={`flex items-center justify-center relative ${styles.iconContainer}`}>
                        <User className={`cursor-pointer ${styles.icon}`} size={21} onClick={() => navigate('/userInfo')} />
                    </div>
                    <div className={`flex items-center justify-center relative ${styles.iconContainer}`}>
                       <Search className={`cursor-pointer ${styles.icon}`} size={21} onClick={() => navigate('/search')}/>
                    </div>
                </div>
            </div>
            <Panel />
        </>
    )
}

function Panel() {
    const navigate = useNavigate();
    const location = useLocation()

    const handleClick = (tab: Tab) => {
        navigate(tab.navigate)
        // console.log(tab, navigate)
    }
    return (
        <div className={`border-t-1 border-b-1 border-gray-200 flex items-center justify-center border-solid`}>
            <div className={`flex items-center text-[12px] font-extrabold tracking-tighter`}>
                {
                    tabs.map((tab, index) => {
                        return (
                            <div className={`py-[7px] relative overflow-hidden ${styles.tab}`} key={index}>
                                <div className={`
                                        cursor-pointer py-[13px] px-[11px] ${location.pathname ===  tab.navigate && styles.tabActiveBG}
                                    `}
                                    onClick={() => handleClick(tab)}
                                >
                                    { tab.label }
                                </div>
                                <div className={`${styles.tabLine} ${location.pathname ===  tab.navigate && styles.tabActiveLine}`}></div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}