"use client";

import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";

import logoutIcon from "../../../../img/icon/logout.svg";

export default function LogoutButton() {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    async function handleLogout() {
        try {
            const token =
                (typeof window !== "undefined" && localStorage.getItem("token")) ||
                Cookies.get("token");

            console.log("Token:", token);

            if (!token) {
                toast.error("No token found. Please login first.");
                return;
            }

            await axios.get("https://exam.elevateegy.com/api/v1/auth/logout", {
                headers: {
                    token: token,
                },
            });

            if (typeof window !== "undefined") {
                localStorage.removeItem("token");
            }
            Cookies.remove("token");

            toast.success("Logged out successfully!");

            router.push("/signin");
        } catch (error: any) {
            console.error("Error during logout:", error.response?.data || error.message);
            toast.error("Logout failed:", error);
        } finally {
            setShowModal(false);
        }
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setShowModal(true)}
                className="flex items-center px-6 mx-6 py-3 mt-4 text-[#696F79] hover:bg-blue-100 rounded-md"
            >
                <span className="mr-3">
                    <Image src={logoutIcon} alt="Dashboard" width={18} height={18} />
                </span>
                Log Out
            </button>

            {showModal && (
                <div className="flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
                        <h2 className="text-lg font-bold mb-4 text-gray-800">Confirm Logout</h2>
                        <p className="text-sm text-gray-600 mb-6">Are you sure you want to log out?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 bg-gray-200 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
