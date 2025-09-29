"use client";
import { useState } from "react";
import Sidebar from "../../../components/shelter/Sidebar";
import Overview from "../../../components/shelter/Overview";
import Pets from "../../../components/shelter/Pets";
import Application from "../../../components/shelter/Application";
import Announcement from "../../../components/shelter/Announcement";
import Settings from "../../../components/shelter/Settings";
import MyApplications from "@/components/shelter/MyApplications";
import MyShelters from "@/components/shelter/MyShelters";

export default function ShelterDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex min-h-screen mt-20 bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-6">
        {activeTab === "overview" && <Overview />}
        {activeTab === "pets" && <Pets />}
        {activeTab === "applications" && <Application />}
        {activeTab === "myApplications" && <MyApplications />}
        {activeTab === "myShelters" && <MyShelters />}
        {activeTab === "announcements" && <Announcement />}
        {activeTab === "settings" && <Settings />}
      </main>
    </div>
  );
}
