'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "../Auth/LogoutButton/LogoutButton";

import FinalLogo from "../../../img/logo/Final Logo 1.png";
import dashboard from "../../../img/icon/Vector.svg";
import quize from "../../../img/icon/quize.svg";

export default function NavbarSide() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return <>
        <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded shadow-lg `}
        >
            ☰ Menu
        </button>

        <nav className={
            `fixed left-0 w-56 text-left transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out md:translate-x-0 md:relative z-40`
        }>
            
            <div className="px-6 py-4">
                <Image
                    src={FinalLogo}
                    alt="Final Logo"
                    width={151}
                    height={29}
                />
            </div>
            <div className="mt-6 space-y-4">
                <Link
                    href={'/'}
                    className="flex items-center px-6 mx-6 py-3 text-white bg-[#4461F2] rounded-md"
                >
                    <span className="mr-3">
                        <Image src={dashboard} alt="Dashboard" width={18} height={18} />
                    </span>
                    Dashboard
                </Link>
                <Link
                    href={'/'}
                    className="flex items-center px-6 mx-6 py-3 text-gray-700 hover:bg-blue-100 rounded-md"
                >
                    <span className="mr-3">
                        <Image src={quize} alt="Dashboard" width={18} height={18} />
                    </span>
                    Quiz History
                </Link>
            </div>
            <div className="absolute">
                <LogoutButton />
            </div>
        </nav>
    </>;
}