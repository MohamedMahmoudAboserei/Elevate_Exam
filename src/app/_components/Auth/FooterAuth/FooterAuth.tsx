'use client';

import Link from "next/link";
import Image from "next/image";

import github from "../../../../img/Logo/github.png";
import logoGoogle from "../../../../img/Logo/Logo Google.png";

import { signIn } from "next-auth/react";

export default function FooterAuth() {

    return <>
        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                    Or Continue with
                </span>
            </div>
        </div>
        <div className="flex space-x-8 mt-4 justify-center">
            <button
                type="button"
                onClick={() => signIn("google", { redirect: true, callbackUrl: '/' })}
                className="h-12 border border-[#E0E0E9] px-4 rounded-2xl shadow-xl"
            >
                <Image
                    src={logoGoogle}
                    alt="Google"
                    width={24}
                    height={24}
                />
            </button>
            <button
                type="button"
                onClick={() => signIn("github", { redirect: true, callbackUrl: '/' })}
                className="h-12 border border-[#E0E0E9] px-4 rounded-2xl shadow-xl"
            >
                <Image
                    src={github}
                    alt="Github"
                    width={24}
                    height={24}
                />
            </button>
        </div>
    </>
}