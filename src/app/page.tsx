"use client";

import { useEffect, useState } from "react";
import LoginPage from "./login/page";
import DashboardPage from "./dashboard/page";

export default function Home() {
  // isLoggedIn starts as null so we can show a loading state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    // For simplicity, check for a token in localStorage.
    // In a real-world app you might use Redux or another state management solution.
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  if (isLoggedIn === null) {
    // While checking, you can display a loading spinner or similar.
    return <div>Loading...</div>;
  }

  // If logged in, show Dashboard; otherwise, show Login page.
  return isLoggedIn ? <DashboardPage /> : <LoginPage />;
}
