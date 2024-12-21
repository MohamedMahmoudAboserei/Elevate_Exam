'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { storeDispatch, storeState } from "@/store/store";
import { login } from "@/store/Authentication/authSlice";

import FooterAuth from "@/app/_components/Auth/FooterAuth/FooterAuth";
import HeroAuth from "@/app/_components/Auth/HeroAuth/HeroAuth";
import NavbarAuth from "@/app/_components/Auth/NavbarAuth/NavbarAuth";

export default function Signin() {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const dispatch = useDispatch<storeDispatch>();
    const { push } = useRouter()
    const { isLoading } = useSelector((state: storeState) => state.authReducer)

    useEffect(() => {
        const savedEmail = localStorage.getItem("email");
        const savedPassword = localStorage.getItem("password");

        if (savedEmail && savedPassword) {
            setRememberMe(true);
        }
    }, []);

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Email is required"),
        password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    });

    const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
        initialValues: {
            email: localStorage.getItem("email") || "",
            password: localStorage.getItem("password") || "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                await dispatch(login(values)).unwrap();
                if (localStorage.getItem("token")) {
                    if (rememberMe) {
                        localStorage.setItem("email", values.email);
                        localStorage.setItem("password", values.password);
                    } else {
                        localStorage.removeItem("email");
                        localStorage.removeItem("password");
                    }
                    push("/");
                }
            } catch (error: any) {
                console.error("Login failed:", error);
            }
        },
    })

    return <>
        <div className="container flex mx-auto w-full min-h-screen items-center justify-around">
            <div className="max-md:hidden">
                <HeroAuth />
            </div>
            <div className="md:w-1/4 max-md:w-11/12">
                <NavbarAuth />
                <h3 className="text-3xl text-[#4461F2]">
                    Sign in
                </h3>
                <form className="space-y-4 my-8" onSubmit={handleSubmit}>
                    <div className="">
                        <input type="email"
                            id="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder="Enter your email"
                            className={`w-full p-3 border rounded-2xl shadow-lg focus:outline-[#4461F2] ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.email && touched.email && (
                            <p className="text-red-500 text-sm">{errors.email}</p>
                        )}
                    </div>
                    <div className="relative">
                        <input type={showPassword ? "text" : "password"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            id="password"
                            placeholder="Enter your password"
                            className={`w-full p-3 border rounded-2xl shadow-lg focus:outline-[#4461F2] ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[28%] text-gray-500"
                        >
                            {showPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                        </button>
                        {errors.password && touched.password && (
                            <p className="text-red-500 text-sm">{errors.password}</p>
                        )}
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center my-4">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                                className="mr-2"
                            />
                            <label htmlFor="rememberMe" className="text-sm text-gray-600">
                                Remember me
                            </label>
                        </div>
                        <p className="text-right">
                            <Link href={'/forgetpassword'} className="text-[#4461F2]">Recover Password ?</Link>
                        </p>
                    </div>
                    {
                        isLoading ? <button type="button" className="w-full bg-[#2563eb] text-white py-3 mt-6 rounded-lg hover:bg-blue-700 transition flex justify-center"><i className="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse"></i></button>
                            :
                            <button type="submit" className="w-full bg-[#2563eb] text-white py-3 mt-6 rounded-lg hover:bg-blue-700 transition">Sign in</button>
                    }
                </form>
                <FooterAuth />
            </div>
        </div>
    </>
}