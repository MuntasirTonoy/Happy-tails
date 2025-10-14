"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { UserRound, Home, PawPrint, Briefcase, ClipboardList } from "lucide-react";
import { useTheme } from "@/components/ui/ThemeContext";


const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

import usersData from "../../public/data/users.json";
import sheltersData from "../../public/data/shelters.json";
import petsData from "../../public/data/pets.json";
import applicationsData from "../../public/data/applications.json";

export default function AdminOverview() {
  const { darkMode } = useTheme();

  // stats
  const [stats, setStats] = useState({ users: 0, admins: 0, shelters: 0, pets: 0, applications: 0 });

  useEffect(() => {
    // combine local JSON + try to fetch APIs (graceful fallback)
    async function load() {
      try {
        const [usersRes, sheltersRes, petsRes, appsRes] = await Promise.allSettled([
          fetch("/api/users"),
          fetch("/api/admin/shelters"),
          fetch("/api/admin/pets"),
          fetch("/api/admin/applications"),
        ]);

        const usersApi = usersRes.status === "fulfilled" && usersRes.value.ok ? await usersRes.value.json() : [];
        const sheltersApi = sheltersRes.status === "fulfilled" && sheltersRes.value.ok ? await sheltersRes.value.json() : [];
        const petsApi = petsRes.status === "fulfilled" && petsRes.value.ok ? await petsRes.value.json() : [];
        const appsApi = appsRes.status === "fulfilled" && appsRes.value.ok ? await appsRes.value.json() : [];

        const allUsers = [...usersData, ...(Array.isArray(usersApi) ? usersApi : [])];
        const allShelters = [...sheltersData, ...(Array.isArray(sheltersApi) ? sheltersApi : [])];
        const allPets = [...petsData, ...(Array.isArray(petsApi) ? petsApi : [])];
        const allApplications = [...applicationsData, ...(Array.isArray(appsApi) ? appsApi : [])];

        const usersCount = allUsers.filter(u => u.role === "user").length;
        const adminsCount = allUsers.filter(u => u.role === "admin").length;
        const sheltersCount = allShelters.length;
        const petsCount = allPets.length;
        const applicationsCount = allApplications.length;

        setStats({ users: usersCount, admins: adminsCount, shelters: sheltersCount, pets: petsCount, applications: applicationsCount });
      } catch (e) {
        console.error(e);
      }
    }

    load();
  }, []);

  // ApexCharts options & series for different panels
  const palette = {
    pink: ["#FF8FA3", "#FFD3E0"],
    teal: ["#67E8F9", "#60A5FA"],
    orange: ["#FFB020", "#FF7A59"],
    violet: ["#A78BFA", "#F0ABFC"],
    green: ["#34D399", "#86efac"],
  };

  const donutOptions = (label) => ({
    chart: { type: "donut", toolbar: { show: false }, sparkline: { enabled: true } },
    labels: [label],
    legend: { show: false },
    dataLabels: { enabled: false },
    stroke: { show: false },
    colors: palette.teal,
    tooltip: { theme: darkMode ? "dark" : "light" },
    fill: { type: "gradient" },
  });

  const donutSeriesShelters = [stats.shelters || 1];

  const barOptionsUsersAdmins = {
    chart: { type: "bar", toolbar: { show: false } },
    plotOptions: { bar: { columnWidth: "50%", borderRadius: 8 } },
    dataLabels: { enabled: false },
    xaxis: { categories: ["Users", "Admins"], labels: { show: true } },
    yaxis: { labels: { formatter: (val) => Math.round(val) } },
    colors: [palette.green[0]],
    tooltip: { theme: darkMode ? "dark" : "light" },
  };
  const barSeriesUsersAdmins = [{ name: "Count", data: [stats.users, stats.admins] }];

  const lineOptionsPets = {
    chart: { type: "line", toolbar: { show: false } },
    stroke: { curve: "smooth", width: 3 },
    markers: { size: 4 },
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    tooltip: { theme: darkMode ? "dark" : "light" },
    colors: [palette.orange[0]],
  };
  // fabricate a small timeseries around pets count for visual
  const lineSeriesPets = [{ name: "Pets", data: [Math.max(1, Math.round(stats.pets * 0.6)), Math.max(1, Math.round(stats.pets * 0.75)), Math.max(1, Math.round(stats.pets * 0.9)), stats.pets, Math.max(1, Math.round(stats.pets * 1.05)), Math.max(1, Math.round(stats.pets * 1.12))] }];

  const barOptionsApplications = {
    chart: { type: "bar", toolbar: { show: false } },
    plotOptions: { bar: { borderRadius: 8, distributed: false } },
    dataLabels: { enabled: false },
    xaxis: { categories: ["Apps"], labels: { show: false } },
    tooltip: { theme: darkMode ? "dark" : "light" },
    colors: [palette.violet[0]],
  };
  const barSeriesApplications = [{ name: "Applications", data: [stats.applications] }];

  // small helper for card bg gradients
  const gradientBg = (g1, g2) => `bg-gradient-to-br from-[${g1}] to-[${g2}]`;

  return (
    <div className={`p-6 mt-2 space-y-8 `}>
      {/* Top header / banner */}
      <motion.div className={`rounded-2xl p-6 relative overflow-hidden`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ background: darkMode ? 'linear-gradient(135deg, rgba(17,24,39,0.6), rgba(30,41,59,0.35))' : 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(240,249,255,0.6))', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full shadow-xl bg-gradient-to-br from-pink-300 to-pink-100">
              <img src="/avatar-placeholder.png" alt="admin" className="object-cover rounded-full w-14 h-14" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Welcome back, Admin</h1>
              <p className="text-sm opacity-80">Overview of the Pet Adoption Portal</p>
            </div>
          </div>

      
        </div>

        {/* decorative circles for glass effect */}
        <div style={{ position: 'absolute', right: -80, top: -40, width: 220, height: 220, borderRadius: 9999, background: 'radial-gradient(circle at 30% 30%, rgba(99,102,241,0.12), transparent 30%)' }} />
        <div style={{ position: 'absolute', left: -60, bottom: -60, width: 220, height: 220, borderRadius: 9999, background: 'radial-gradient(circle at 70% 70%, rgba(34,197,94,0.08), transparent 30%)' }} />
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-6 text-black sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <motion.div className="p-4 shadow-2xl rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100" whileHover={{ scale: 1.03 }}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-pink-700">Users</h3>
              
              <p className="text-2xl font-bold ">{stats.users}</p>
            </div>
            <div className="p-3 rounded-lg shadow-inner bg-white/60">
              <UserRound className="w-6 h-6 text-pink-600 drop-shadow-sm" />

            </div>
          </div>
          <div className="mt-3 text-xs opacity-80">Active users registered on platform</div>
        </motion.div>

        <motion.div className="p-4 shadow-2xl rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100" whileHover={{ scale: 1.03 }}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-emerald-700">Admins</h3>
              <p className="text-2xl font-bold">{stats.admins}</p>
            </div>
            <div className="p-3 rounded-lg shadow-inner bg-white/60">
              <Home className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <div className="mt-3 text-xs opacity-80">Platform administrators and superusers</div>
        </motion.div>

        <motion.div className="p-4 shadow-2xl rounded-2xl bg-gradient-to-br from-cyan-50 to-cyan-100" whileHover={{ scale: 1.03 }}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-cyan-700">Shelters</h3>
              <p className="text-2xl font-bold">{stats.shelters}</p>
            </div>
            <div className="p-3 rounded-lg shadow-inner bg-white/60">
              <Briefcase className="w-6 h-6 text-cyan-600" />
            </div>
          </div>
          <div className="mt-3 text-xs opacity-80">Registered shelter organizations</div>
        </motion.div>

        <motion.div className="p-4 shadow-2xl rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100" whileHover={{ scale: 1.03 }}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-orange-700">Pets</h3>
              <p className="text-2xl font-bold">{stats.pets}</p>
            </div>
            <div className="p-3 rounded-lg shadow-inner bg-white/60">
              <PawPrint className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-3 text-xs opacity-80">Pets currently listed for adoption</div>
        </motion.div>

        <motion.div className="p-4 shadow-2xl rounded-2xl bg-gradient-to-br from-violet-50 to-violet-100" whileHover={{ scale: 1.03 }}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-violet-700">Applications</h3>
              <p className="text-2xl font-bold">{stats.applications}</p>
            </div>
            <div className="p-3 rounded-lg shadow-inner bg-white/60">
              <ClipboardList className="w-6 h-6 text-violet-600" />
            </div>
          </div>
          <div className="mt-3 text-xs opacity-80">Pending adoption & shelter applications</div>
        </motion.div>
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <motion.div className="p-4 shadow-xl rounded-2xl glass" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.06)', background: darkMode ? 'linear-gradient(180deg, rgba(17,24,39,0.6), rgba(30,41,59,0.35))' : 'linear-gradient(180deg, rgba(255,255,255,0.7), rgba(250,250,255,0.6))' }}>
          <h4 className="mb-3 font-semibold text-md">Users vs Admins</h4>
          <div style={{ height: 220 }}>
            <ReactApexChart options={barOptionsUsersAdmins} series={barSeriesUsersAdmins} type="bar" height={220} />
          </div>
        </motion.div>

        <motion.div className="p-4 shadow-xl rounded-2xl glass" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} style={{ backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.06)', background: darkMode ? 'linear-gradient(180deg, rgba(17,24,39,0.6), rgba(30,41,59,0.35))' : 'linear-gradient(180deg, rgba(255,255,255,0.7), rgba(250,250,255,0.6))' }}>
          <h4 className="mb-3 font-semibold text-md">Shelters</h4>
          <div className="flex items-center justify-center" style={{ height: 220 }}>
            <ReactApexChart options={donutOptions("Shelters")} series={donutSeriesShelters} type="donut" height={200} />
          </div>
        </motion.div>

        <motion.div className="p-4 shadow-xl rounded-2xl lg:col-span-1 glass" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} style={{ backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.06)', background: darkMode ? 'linear-gradient(180deg, rgba(17,24,39,0.6), rgba(30,41,59,0.35))' : 'linear-gradient(180deg, rgba(255,255,255,0.7), rgba(250,250,255,0.6))' }}>
          <h4 className="mb-3 font-semibold text-md">Pets</h4>
          <div style={{ height: 220 }}>
            <ReactApexChart options={lineOptionsPets} series={lineSeriesPets} type="line" height={220} />
          </div>
        </motion.div>

        <motion.div className="p-4 shadow-xl rounded-2xl lg:col-span-3 glass" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45 }} style={{ backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.06)', background: darkMode ? 'linear-gradient(180deg, rgba(17,24,39,0.55), rgba(30,41,59,0.28))' : 'linear-gradient(180deg, rgba(255,255,255,0.75), rgba(250,250,255,0.62))' }}>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-md">Applications</h4>
            <div className="text-sm opacity-80">Recent activity</div>
          </div>

          <div style={{ height: 260 }}>
            <ReactApexChart options={barOptionsApplications} series={barSeriesApplications} type="bar" height={260} />
          </div>
        </motion.div>
      </div>

    </div>
  );
}
