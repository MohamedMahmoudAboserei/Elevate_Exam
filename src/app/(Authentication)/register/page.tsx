'use client';

import { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { storeDispatch, storeState } from "@/store/store";
import { register } from "@/store/Authentication/registerSlice";

import FooterAuth from "@/app/_components/Auth/FooterAuth/FooterAuth";
import HeroAuth from "@/app/_components/Auth/HeroAuth/HeroAuth";
import NavbarAuth from "@/app/_components/Auth/NavbarAuth/NavbarAuth";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const dispatch = useDispatch<storeDispatch>();
    const { push } = useRouter();
    const { isLoading, error: registerError } = useSelector((state: storeState) => state.registerReducer);

    const validationSchema = Yup.object({
        username: Yup.string()
            .required("Username is required")
            .min(4, "Must be at least 4 characters")
            .max(25, "Must be less than 25 characters"),
        firstName: Yup.string()
            .required("First name is required")
            .min(3, "Must be at least 3 characters")
            .max(20, "Must be less than 20 characters"),
        lastName: Yup.string()
            .required("Last name is required")
            .min(3, "Must be at least 3 characters")
            .max(20, "Must be less than 20 characters"),
        email: Yup.string().email("Invalid email address").required("Email is required"),
        password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters"),
        rePassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm password is required"),
        phone: Yup.string()
            .matches(/^\d{11}$/, "Phone number must be 11 digits")
            .required("Phone number is required"),
    });

    const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
        initialValues: {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            rePassword: '',
            phone: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            const result = await dispatch(register(values));
            if (result.meta.requestStatus === "fulfilled") {
                push("/signin");
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
                    Create an account
                </h3>
                <form className="space-y-4 my-8" onSubmit={handleSubmit}>
                    <div className="">
                        <input type="text"
                            id="username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                            placeholder="Enter your user name"
                            className={`w-full p-3 border rounded-2xl shadow-lg focus:outline-[#4461F2] ${errors.username && touched.username ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.username && touched.username && (
                            <p className="text-red-500 text-sm">{errors.username}</p>
                        )}
                    </div>
                    <div className="flex space-x-2">
                        <div className="">
                            <input type="text"
                                id="firstName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.firstName}
                                placeholder="Enter your first name"
                                className={`w-full p-3 border rounded-2xl shadow-lg focus:outline-[#4461F2] ${errors.firstName && touched.firstName ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.firstName && touched.firstName && (
                                <p className="text-red-500 text-sm">{errors.firstName}</p>
                            )}
                        </div>
                        <div className="">
                            <input type="text"
                                id="lastName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastName}
                                placeholder="Enter your last name"
                                className={`w-full p-3 border rounded-2xl shadow-lg focus:outline-[#4461F2] ${errors.lastName && touched.lastName ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.lastName && touched.lastName && (
                                <p className="text-red-500 text-sm">{errors.lastName}</p>
                            )}
                        </div>
                    </div>
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
                            id="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
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
                    <div className="relative">
                        <input type={showConfirmPassword ? "text" : "password"}
                            id="rePassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.rePassword}
                            placeholder="Enter your Confirm Password"
                            className={`w-full p-3 border rounded-2xl shadow-lg focus:outline-[#4461F2] ${errors.rePassword && touched.rePassword ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-[28%] text-gray-500"
                        >
                            {showConfirmPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                        </button>
                        {errors.rePassword && touched.rePassword && (
                            <p className="text-red-500 text-sm">{errors.rePassword}</p>
                        )}
                    </div>
                    <div className="">
                        <input type="text"
                            id="phone"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phone}
                            placeholder="Enter your phone"
                            className={`w-full p-3 border rounded-2xl shadow-lg focus:outline-[#4461F2] ${errors.phone && touched.phone ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.phone && touched.phone && (
                            <p className="text-red-500 text-sm">{errors.phone}</p>
                        )}
                    </div>
                    <p className="text-center">
                        Already have an account? <Link href={'/signin'} className="text-[#4461F2]">Login</Link>
                    </p>
                    {registerError && <p className="text-red-500 text-center">{registerError}</p>}
                    {
                        isLoading ? <button type="button" className="w-full bg-[#4461F2] text-white py-3 mt-6 rounded-lg hover:bg-blue-700 transition flex justify-center"><i className="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse"></i></button>
                            :
                            <button type="submit" className="w-full bg-[#4461F2] text-white py-3 mt-6 rounded-lg hover:bg-blue-700 transition">Create Account</button>
                    }
                </form>
                <FooterAuth />
            </div>
        </div>
    </>
}