"use client";
export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="w-64 bg-white shadow-md">
      <nav className="flex flex-col p-4 space-y-2">
        <button
          onClick={() => setActiveTab("overview")}
          className={`p-2 rounded ${
            activeTab === "overview" ? "bg-green-500 text-white" : "hover:bg-gray-200"
          }`}
        >
          Overview
        </button>

        <button
          onClick={() => setActiveTab("pets")}
          className={`p-2 rounded ${
            activeTab === "pets" ? "bg-green-500 text-white" : "hover:bg-gray-200"
          }`}
        >
          Pets
        </button>

        <button
          onClick={() => setActiveTab("applications")}
          className={`p-2 rounded ${
            activeTab === "applications" ? "bg-green-500 text-white" : "hover:bg-gray-200"
          }`}
        >
          Applications
        </button>

        <button
          onClick={() => setActiveTab("myApplications")}
          className={`p-2 rounded ${
            activeTab === "myApplications"
              ? "bg-green-500 text-white"
              : "hover:bg-gray-200"
          }`}
        >
          My Applications
        </button>

        <button
          onClick={() => setActiveTab("myShelters")}
          className={`p-2 rounded ${
            activeTab === "myShelters"
              ? "bg-green-500 text-white"
              : "hover:bg-gray-200"
          }`}
        >
          My Shelters
        </button>




        <button
          onClick={() => setActiveTab("announcements")}
          className={`p-2 rounded ${
            activeTab === "announcements" ? "bg-green-500 text-white" : "hover:bg-gray-200"
          }`}
        >
          Announcements
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`p-2 rounded ${
            activeTab === "settings" ? "bg-green-500 text-white" : "hover:bg-gray-200"
          }`}
        >
          Settings
        </button>
      </nav>
    </aside>
  );
}
