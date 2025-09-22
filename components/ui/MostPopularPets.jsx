"use client";

import { useEffect, useState } from "react";
import { FaPaw } from "react-icons/fa";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

export default function MostPopularPets() {
  const [vaccinatedPets, setVaccinatedPets] = useState([]);
  const [floatingPaws, setFloatingPaws] = useState([]);

  // Fetch pets
  useEffect(() => {
    fetch("/data/pets.json")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((pet) => pet.vaccinated === true);
        setVaccinatedPets(filtered);
      })
      .catch((err) => console.error("Error fetching pets:", err));
  }, []);

  useEffect(() => {
    const paws = Array.from({ length: 40 }).map(() => {
      const size = Math.floor(Math.random() * 20) + 8; 
      const top = Math.random() * 100;
      const left = Math.random() * 100; 
      const opacity = (Math.random() * 0.4 + 0.1).toFixed(2); 
      const duration = Math.floor(Math.random() * 10) + 4; 
      const delay = Math.random() * 5; 
      return { size, top, left, opacity, duration, delay };
    });
    setFloatingPaws(paws);
  }, []);

  return (
    <section className="py-16 bg-base-100 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-base-content">
            Most Popular Pets
          </h2>
          <p className="mt-2 text-base-content">
            Our lovely vaccinated pets are ready to bring happiness to your family.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left: Slider */}
          <div>
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }}
              loop={true}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="rounded-2xl shadow-lg"
            >
              {vaccinatedPets.slice(0, 6).map((pet) => (
                <SwiperSlide key={pet._id?.$oid || pet._id}>
                  <div className="relative">
                    <img
                      src={pet.imageUrl[0]}
                      alt={pet.name}
                      className="w-full h-64 sm:h-72 md:h-80 object-cover rounded-2xl"
                    />
                    <div className="absolute bottom-4 left-4 px-4 py-2 rounded-xl bg-black/50">
                      <h3 className="text-white font-semibold text-lg">{pet.name}</h3>
                      <p className="text-gray-200 text-sm">{pet.breed}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Right: Main Paw Box */}
          <div className="relative flex items-center justify-center">
            <div className="bg-green-600 dark:bg-green-400 text-white rounded-[50%] p-10 md:p-16 shadow-lg relative z-10">
              <FaPaw className="absolute text-base-content -top-6 -left-6 text-6xl opacity-30" />
              <h3 className="text-2xl text-base-content font-bold mb-2">Available for Adoption</h3>
              <p className="mb-4 text-base-content text-sm">
                Discover our vaccinated pets who are healthy, friendly, and
                waiting for a new home.
              </p>
              <Link href="/pets">
                <button className="px-5 py-2 bg-white text-green-700 rounded-full font-semibold shadow hover:bg-gray-100">
                  More Pets
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Paw Shapes */}
      {floatingPaws.map((paw, idx) => (
        <FaPaw
          key={idx}
          className="absolute text-green-500"
          style={{
            fontSize: `${paw.size}px`,
            top: `${paw.top}%`,
            left: `${paw.left}%`,
            opacity: paw.opacity,
            animation: `float ${paw.duration}s ease-in-out ${paw.delay}s infinite`,
          }}
        />
      ))}

      {/* Keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
}
