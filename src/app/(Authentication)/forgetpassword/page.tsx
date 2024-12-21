'use client';

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { storeDispatch, storeState } from "@/store/store";
import { forgetPassword, verifyResetCode, resetPassword } from "@/store/Authentication/authSlice";

import FooterAuth from "@/app/_components/Auth/FooterAuth/FooterAuth";
import HeroAuth from "@/app/_components/Auth/HeroAuth/HeroAuth";
import NavbarAuth from "@/app/_components/Auth/NavbarAuth/NavbarAuth";

export default function Signin() {
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch<storeDispatch>();
    const { push } = useRouter();
    const { isLoading } = useSelector((state: storeState) => state.authReducer);

    const forgetPasswordFormik = useFormik({
        initialValues: { email: "" },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Email is required"),
        }),
        onSubmit: async (values) => {
            await dispatch(forgetPassword(values));
            setStep(2);
        },
    });

    const verifyResetCodeFormik = useFormik({
        initialValues: { resetCode: "" },
        validationSchema: Yup.object({
            resetCode: Yup.string()
                .matches(/^\d{6}$/, "Reset code must be 6 digits")
                .required("Reset code is required"),
        }),
        onSubmit: async (values) => {
            await dispatch(verifyResetCode(values));
            setStep(3);
        },
    });

    const resetPasswordFormik = useFormik({
        initialValues: { email: "", newPassword: "" },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Email is required"),
            newPassword: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        }),
        onSubmit: async (values) => {
            await dispatch(resetPassword(values));
            if (localStorage.getItem("token")) {
                push("/");
            }
        },
    });

    return <>
        <div className="container flex mx-auto w-full min-h-screen items-center justify-around">
            <div className="max-md:hidden">
                <HeroAuth />
            </div>
            <div className="w-1/4">
                <NavbarAuth />
                {step === 1 && (
                    <form onSubmit={forgetPasswordFormik.handleSubmit} className="space-y-4 my-8">
                        <h2 className="text-2xl font-semibold text-gray-800">Forgot Password</h2>
                        <input
                            onChange={forgetPasswordFormik.handleChange}
                            onBlur={forgetPasswordFormik.handleBlur}
                            value={forgetPasswordFormik.values.email}
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-3 border rounded-2xl shadow-lg focus:outline-[#4461F2]"
                        />
                        {forgetPasswordFormik.errors.email && forgetPasswordFormik.touched.email && (
                            <p className="text-red-500 text-sm">{forgetPasswordFormik.errors.email}</p>
                        )}
                        <button type="submit" className="w-full bg-[#4461F2] text-white py-3 mt-6 rounded-lg hover:bg-blue-700 transition">
                            Send Reset Code
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={verifyResetCodeFormik.handleSubmit} className="space-y-4 my-8">
                        <h2 className="text-2xl font-semibold text-gray-800">Verify Reset Code</h2>
                        <input
                            onChange={verifyResetCodeFormik.handleChange}
                            onBlur={verifyResetCodeFormik.handleBlur}
                            value={verifyResetCodeFormik.values.resetCode}
                            id="resetCode"
                            type="text"
                            placeholder="Enter reset code"
                            className="w-full p-3 border rounded-2xl shadow-xl focus:outline-[#2563eb] mb-4"
                        />
                        {verifyResetCodeFormik.errors.resetCode && verifyResetCodeFormik.touched.resetCode && (
                            <p className="text-red-500 text-sm">{verifyResetCodeFormik.errors.resetCode}</p>
                        )}
                        <button type="submit" className="w-full bg-[#4461F2] text-white py-3 mt-6 rounded-lg hover:bg-blue-700 transition">
                            Verify Code
                        </button>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={resetPasswordFormik.handleSubmit} className="space-y-4 my-8">
                        <h2 className="text-2xl font-semibold text-gray-800">Reset Password</h2>
                        <input
                            onChange={resetPasswordFormik.handleChange}
                            onBlur={resetPasswordFormik.handleBlur}
                            value={resetPasswordFormik.values.email}
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-3 border rounded-2xl shadow-xl focus:outline-[#2563eb] mb-4"
                        />
                        {resetPasswordFormik.errors.email && resetPasswordFormik.touched.email && (
                            <p className="text-red-500 text-sm">{resetPasswordFormik.errors.email}</p>
                        )}
                        <div className="relative">
                            <input
                                onChange={resetPasswordFormik.handleChange}
                                onBlur={resetPasswordFormik.handleBlur}
                                value={resetPasswordFormik.values.newPassword}
                                id="newPassword"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter new password"
                                className="w-full p-3 border rounded-2xl shadow-xl focus:outline-[#2563eb] mb-4"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-[28%] text-gray-500"
                            >
                                {showPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                            </button>
                        </div>
                        {resetPasswordFormik.errors.newPassword && resetPasswordFormik.touched.newPassword && (
                            <p className="text-red-500 text-sm">{resetPasswordFormik.errors.newPassword}</p>
                        )}
                        <button type="submit" className="w-full bg-[#4461F2] text-white py-3 mt-6 rounded-lg hover:bg-blue-700 transition">
                            Reset Password
                        </button>
                    </form>
                )}
                <FooterAuth />
            </div>
        </div>
    </>
}