"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { AppDispatch, RootState } from "../../store/store";
import { loginAsync } from "../../store/actions/authActions";

interface LoginFormInputs {
    email: string;
    password: string;
}

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});

const LoginPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { status, error, user } = useSelector((state: RootState) => state.auth);

    const initialValues: LoginFormInputs = {
        email: "gidudunicholas166@gmail.com",
        password: "12345678"
    };

    const onSubmit = async (values: LoginFormInputs) => {
        const resultAction = await dispatch(loginAsync(values));
        if (loginAsync.fulfilled.match(resultAction)) {
            router.push("/dashboard");
        } else {
            console.error("Login failed", resultAction.payload);
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Left Section - Branding */}
            <div className="hidden md:flex flex-col justify-center w-1/2 p-8 bg-gray-100 relative">
                <div className="absolute inset-0">
                    <img
                        src="/images/login-bg.jpg"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gray-900 opacity-20"></div>
                </div>
                <div className="relative z-10 text-white p-6 max-w-md">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold">
                            e<span className="text-teal-400">financi</span>
                        </h1>
                        <p className="text-sm italic">Your 360° Financial Data Manager</p>
                    </div>
                    <h2 className="text-3xl font-bold mb-4">
                        Embrace new technology <br /> empower your business
                    </h2>
                    <p className="text-sm leading-relaxed mb-8">
                        Our core banking software allows you to increase agility, boost
                        cost-efficiency, and drive growth.
                    </p>
                    <p className="text-xs mt-16">From GMT Consults LTD</p>
                </div>
            </div>

            {/* Right Section - Form */}
            <div className="flex flex-col justify-center w-full md:w-1/2 p-6 md:p-16">
                <div className="max-w-sm mx-auto w-full">
                    <h2 className="text-xl font-bold text-gray-700 mb-8">
                        Welcome back! - Staff
                    </h2>
                    {status === "loading" && <p className="text-blue-600 mb-4">Logging in...</p>}
                    {status === "failed" && error && <p className="mb-4 text-red-600">{error}</p>}
                    {user && status === "succeeded" && (
                        <p className="mb-4 text-green-600">
                            Logged in as {user.first_name} {user.last_name}
                        </p>
                    )}
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form className="space-y-5">
                                <div>
                                    <label htmlFor="email" className="block text-gray-600 text-sm font-medium">
                                        Email Address
                                    </label>
                                    <div className="mt-1">
                                        <Field
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-400 ${errors.email && touched.email ? "border-red-500" : "border-gray-300"
                                                }`}
                                        />
                                        <ErrorMessage name="email" component="p" className="mt-1 text-sm text-red-500" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-gray-600 text-sm font-medium">
                                        Password
                                    </label>
                                    <div className="mt-1 relative">
                                        <Field
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="••••••••"
                                            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-400 ${errors.password && touched.password ? "border-red-500" : "border-gray-300"
                                                }`}
                                        />
                                        <ErrorMessage name="password" component="p" className="mt-1 text-sm text-red-500" />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded"
                                    disabled={status === "loading"}
                                >
                                    {status === "loading" ? "Logging in..." : "Continue"}
                                </button>
                            </Form>
                        )}
                    </Formik>
                    <div className="flex justify-between items-center mt-4">
                        <a href="#" className="text-sm text-teal-500 hover:text-teal-600 underline">
                            Forgot Password?
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LoginPage;
