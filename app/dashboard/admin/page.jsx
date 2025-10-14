"use client";
import AdminOverview from "@/components/admin/Overview";

export default function AdminDashboardPage() {

  return (
    <div
      className={` min-h-screen transition-colors  duration-500`}
    >

        <AdminOverview />
     
    </div>
  );
}
