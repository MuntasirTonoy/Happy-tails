"use client";

import { useEffect, useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { IoPeopleOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { useTheme } from "@/components/ui/ThemeContext";

export default function AboutPage() {
  const [pets, setPets] = useState([]);
  const { darkMode } = useTheme();

  useEffect(() => {
    fetch("/data/pets.json")
      .then((res) => res.json())
      .then((data) => setPets(data))
      .catch((err) => console.error("Error fetching pets:", err));
  }, []);

  return (
    <div className="bg-base-100 text-base-content">
      {/* About Heading */}
      <section className="py-20 md:py-32 text-center">
        <h1 className="text-4xl font-bold text-base-content mb-4">
          About HappyTails
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-base-content">
          HappyTails is dedicated to providing love, care, and forever homes for
          pets in need. Our community works together to rescue, rehabilitate,
          and rehome animals, spreading happiness one tail at a time.
        </p>
      </section>

      {/* Mission, Vision, Values */}
      <section className=" bg-base-100 max-w-7xl mx-auto">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-base-content mb-12">
            Our Mission, Vision, and Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-green-100 relative p-6 rounded-lg shadow-md hover:shadow-lg transition text-black">
                {/* Overlay */}
            <div
             className="absolute inset-0 transition-colors duration-300"
             style={{
             backgroundColor: darkMode ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.08)",
            }}
            ></div>
              <h3 className="text-xl font-bold text-green-600 mb-4">Mission</h3>
              <p className="">
                To connect loving homes with pets in need through a seamless and supportive adoption process,ensuring every animal finds a safe, nurturing environment.
              </p>
            </div>
            <div className="bg-green-100 p-6 rounded-lg shadow-md hover:shadow-lg transition text-black relative">
                {/* Overlay */}
              <div
               className="absolute inset-0 transition-colors duration-300"
               style={{
               backgroundColor: darkMode ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.08)",
               }}
               ></div>
              <h3 className="text-xl font-bold text-green-600 mb-4">Vision</h3>
              <p>
                To be the leading pet adoption portal,recognized for our commitment to animal welfare and innovative approach to connect pets with adopters.
              </p>
            </div>
            <div className="bg-green-100 p-6 rounded-lg shadow-md hover:shadow-lg relative transition text-black">
                {/* Overlay */}
               <div
                className="absolute inset-0 transition-colors duration-300"
                style={{
                backgroundColor: darkMode ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.08)",
                }}
               ></div>
              <h3 className="text-xl font-bold text-green-600 mb-4">Values</h3>
              <p>
                Compassion,Integrity,Collaboration,
                Innovations, Responsibility, and Community — the guiding
                principles of HappyTails.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 text-center max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-base-content mb-12">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
          {[
            {
              name: "Muntasir Mahmud",
              role: "Founder & Chief Strategist",
              img: "https://i.ibb.co.com/Fqs089Xy/tonoy.webp",
            },
            {
              name: "Tanzia Mourin Chowdhury",
              role: "Animal Care Specialist & Welfare Associate",
              img: "https://i.ibb.co.com/HDV39RSJ/mourin.jpg",
            },
            {
              name: "Nazat Akter",
              role: "Animal Rescue & Adoption Coordinator",
              img: "https://i.ibb.co.com/0jrYpgHT/nazaat.jpg",
            },
            {
              name: "Mst. Nasrin Howlader Jerin",//wise donkey of the team !!
              role: "Pet Wellness & Nutrition Coordinator",
              img: "https://i.ibb.co.com/q3s8DDkk/jerin.png",
            },
          ].map((member, i) => (
            <div
              key={i}
              className="bg-base-300 p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-28 h-28 mx-auto rounded-full mb-4 object-cover"
              />
              <h3 className="text-lg font-bold text-green-600">{member.name}</h3>
              <p className="text-base-content">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-base-100 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-base-content mb-12 text-center">
          Success Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
          {pets.slice(0, 2).map((pet, idx) => (
            <div
              key={idx}
              className="bg-base-200 rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={pet.imageUrl[0]}
                alt={pet.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-green-600 mb-2">
                  {pet.name}
                </h3>
                <p className="text-base-content">{pet.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How You Can Help */}
      <section className="relative py-16 bg-green-100 text-center max-w-7xl mx-auto rounded-md">
        {/* Overlay */}
            <div
             className="absolute inset-0 transition-colors duration-300"
             style={{
             backgroundColor: darkMode ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.08)",
            }}
            ></div>
        <h2 className="text-3xl font-semibold text-black mb-4">
          How You Can Help
        </h2>
        <p className="max-w-2xl mx-auto text-gray-700 mb-12">
          There are many ways to make a difference in the lives of pets in need.
          Join us in spreading love and care.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-8 px-6 mb-8">
          <div className="flex items-start gap-4  p-6 rounded-xl w-full md:w-1/3">
            <div className="bg-green-500 text-gray-600 p-3 rounded-md">
              <IoPeopleOutline size={24}/>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-green-600">Volunteer</h3>
              <p className="text-gray-600">
                Give your time and skills to help our pets feel loved and cared
                for.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 rounded-xl w-full md:w-1/3">
            <div className="bg-green-500 text-gray-600 p-3 rounded-md">
              <FaRegHeart size={24}/>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-green-600">Donate</h3>
              <p className="text-gray-600">
                Your financial support helps us rescue, treat, and rehome more
                pets every day.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4  p-6 rounded-xl w-full md:w-1/3">
            <div className="bg-green-500 text-gray-600 p-3 rounded-md">
              <IoHomeOutline size={24}/>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-green-600">Foster</h3>
              <p className="text-gray-600">
                Open your home temporarily to pets in transition and give them a
                safe space.
              </p>
            </div>
          </div>
        </div>

        <button className="bg-green-600 text-black font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition">
          Get Involved
        </button>
      </section>
    </div>
  );
}
