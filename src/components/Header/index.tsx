// import { useState, useEffect, useRef } from "react";
import useWindowWidth from '@/hooks/useWindowWidth'
import styles from './index.module.scss'
import logo from '../../assets/women-logo.svg'

const tabs: Array<string> = [
    "WOMEN",
    "MEN",
    "KIDS",
    "FIND A STORE"
]

export default function Header() {
    const windowWidth = useWindowWidth()
    return (
        <>
            <div className={`flex items-center justify-between`}>
                <div className={`flex items-center flex-1`}>
                    {
                        tabs.map((tab, index) => <div className={`${styles.tab}`} key={index}>{ tab }</div>)
                    }
                </div>
                <div className={`${windowWidth > 768 ? 'w-[136px]' : 'w-[110px]'}`}>
                    <img src={logo}/>{windowWidth}
                </div>
                <div className={`flex items-center flex-1 flex-row-reverse`}>
                    <div>1</div>
                    <div>33</div>
                </div>
            </div>
            <Panel />
        </>
    )
}

function Panel() {
    return (
        <div>panel</div>
    )
}