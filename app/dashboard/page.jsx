"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "./admin/layout";
import AdminDashboardPage from "./admin/AdminDashboardPage";
// import UserLayout from "./user/UserLayout";
// import UserDashboardPage from "./user/UserDashboardPage";
// import ShelterLayout from "./shelter/layout";
// import ShelterDashboardPage from "./shelter/page";

export const metadata = {
  title: "Happy Tails",
  description: "A Pet Adoption Portal",
};

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    const role = localStorage.getItem("role");
    const ownedShelterId = localStorage.getItem("ownedShelterId"); // shelter owner check
    setUser({ role, ownedShelterId });
    setLoading(false);
  }, []);

  if (loading) return <p className="mt-10 text-center">Loading...</p>;

  if (!user) return <p className="mt-10 text-center text-red-500">No user data found</p>;

  // Admin Dashboard
  if (user.role === "admin") {
    return (
      <AdminLayout>
        <AdminDashboardPage />
      </AdminLayout>
    );
  }

  // Shelter Dashboard
  // if (user.role === "user" && user.ownedShelterId) {
  //   return (
  //     <ShelterLayout>
  //       <ShelterDashboardPage />
  //     </ShelterLayout>
  //   );
  // }

  // Normal User Dashboard
  // if (user.role === "user") {
  //   return (
  //     <UserLayout>
  //       <UserDashboardPage />
  //     </UserLayout>
  //   );
  // }

  return (
    <p className="mt-10 text-center text-red-500">
      You don’t have permission to view this dashboard.
    </p>
  );
};

export default Dashboard;
