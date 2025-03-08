// app/dashboard/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import { logout } from "@/store/reducers/authReducer";

const DashboardPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const { user } = useSelector((state: RootState) => state.auth);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        setDropdownOpen(false);
        router.push("/login");
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-white border-r p-4">
                <div className="text-2xl font-bold mb-6">FreightFlow</div>
                <nav className="flex-1">
                    <ul className="space-y-2 text-gray-600">
                        <li className="font-medium bg-gray-100 p-2 rounded">Dashboard</li>
                        <li className="p-2 hover:bg-gray-100 rounded">Shipments</li>
                        <li className="p-2 hover:bg-gray-100 rounded">Orders</li>
                        <li className="p-2 hover:bg-gray-100 rounded">Analytics</li>
                        <li className="p-2 hover:bg-gray-100 rounded">Payments</li>
                        <li className="p-2 hover:bg-gray-100 rounded">Users</li>
                    </ul>
                </nav>
                <div className="mt-auto">
                    <button className="w-full py-2 bg-gray-200 text-gray-700 rounded">
                        Upgrade &amp; Unlock
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                {/* Header with Dropdown Toggler */}
                <header className="flex items-center justify-between bg-white border-b p-4">
                    <h1 className="text-xl font-bold">Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <button className="text-sm bg-gray-200 px-2 py-1 rounded">ENG</button>
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center space-x-2 focus:outline-none"
                            >
                                <span className="text-gray-600">
                                    {user ? `${user.first_name} ${user.last_name}` : "Ismael Maddox"}
                                </span>
                                <img
                                    src="https://via.placeholder.com/32"
                                    alt="avatar"
                                    className="w-8 h-8 rounded-full"
                                />
                                <svg
                                    className="w-4 h-4 text-gray-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    ></path>
                                </svg>
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                                    >
                                        <svg
                                            className="w-4 h-4 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17 16l4-4m0 0l-4-4m4 4H7"
                                            ></path>
                                        </svg>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="p-4 flex-1 overflow-y-auto">
                    {/* {loading && <p className="text-blue-600">Loading dashboard data...</p>}
                    {error && <p className="text-red-600">{error}</p>} */}

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white p-4 rounded shadow">
                            <p className="text-gray-500 text-sm">Shipments</p>
                            <h2 className="text-2xl font-bold mt-1">{6521}</h2>
                            <p className="text-green-500 text-sm">↑ Tracking</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <p className="text-gray-500 text-sm">Orders</p>
                            <h2 className="text-2xl font-bold mt-1">{10105}</h2>
                            <p className="text-green-500 text-sm">↑ Tracking</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <p className="text-gray-500 text-sm">Revenue</p>
                            <h2 className="text-2xl font-bold mt-1">${12167}</h2>
                            <p className="text-green-500 text-sm">↑ Tracking</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <p className="text-gray-500 text-sm">Deliveries</p>
                            <h2 className="text-2xl font-bold mt-1">{1840}</h2>
                            <p className="text-green-500 text-sm">↑ Tracking</p>
                        </div>
                    </div>

                    {/* Delivery / Map Section */}
                    <div className="flex flex-col lg:flex-row gap-4 mb-6">
                        {/* Ongoing Delivery */}
                        <div className="bg-white flex-1 p-4 rounded shadow">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold">Ongoing delivery</h3>
                                <button className="text-sm text-blue-500 hover:underline">Filter</button>
                            </div>
                            <div className="border p-3 rounded mb-3 flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">#001234ABCD</p>
                                    <p className="text-xs text-gray-400">Ongoing</p>
                                </div>
                                <img
                                    src="/images/truck-icon.png"
                                    alt="Truck"
                                    className="w-12 h-8 object-contain"
                                />
                            </div>
                            <div className="border p-3 rounded mb-3 flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">#007654ZYXW</p>
                                    <p className="text-xs text-gray-400">In Transit</p>
                                </div>
                                <img
                                    src="/images/truck-icon.png"
                                    alt="Truck"
                                    className="w-12 h-8 object-contain"
                                />
                            </div>
                        </div>

                        {/* On the Way - Map */}
                        <div className="bg-white flex-1 p-4 rounded shadow">
                            <h3 className="text-lg font-bold mb-4">On the way</h3>
                            <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded">
                                <span className="text-gray-500">Map Preview</span>
                            </div>
                            <div className="mt-3 text-sm text-gray-500">
                                Electronic • 60.41 km • 1d 16h
                            </div>
                        </div>
                    </div>

                    {/* Tracking Order Table */}
                    <div className="bg-white p-4 rounded shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold">Tracking Order</h3>
                            <div className="space-x-2">
                                <button className="px-3 py-1 bg-gray-100 text-sm rounded">Filter</button>
                                <button className="px-3 py-1 bg-gray-100 text-sm rounded">Exports</button>
                            </div>
                        </div>
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-gray-500 text-sm border-b">
                                    <th className="py-2">Order #</th>
                                    <th className="py-2">Category</th>
                                    <th className="py-2">Tracking #</th>
                                    <th className="py-2">Weight</th>
                                    <th className="py-2">Distance</th>
                                    <th className="py-2">Location</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                <tr className="border-b">
                                    <td className="py-2">#001</td>
                                    <td className="py-2">Electronic</td>
                                    <td className="py-2">7/10/2023</td>
                                    <td className="py-2">25kg</td>
                                    <td className="py-2">60.41 km</td>
                                    <td className="py-2">14 River Lane</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-2">#002</td>
                                    <td className="py-2">Clothing</td>
                                    <td className="py-2">7/10/2023</td>
                                    <td className="py-2">20kg</td>
                                    <td className="py-2">80 km</td>
                                    <td className="py-2">79 Walden Road</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-2">#003</td>
                                    <td className="py-2">Furniture</td>
                                    <td className="py-2">7/11/2023</td>
                                    <td className="py-2">150kg</td>
                                    <td className="py-2">120 km</td>
                                    <td className="py-2">10 Holland Bridge</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
