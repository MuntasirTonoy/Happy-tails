"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";


export default function PetDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [pet, setPet] = useState(null);
  const [allPets, setAllPets] = useState([]);
  const [shelters, setShelters] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    // fetch pets
    fetch("/data/pets.json")
      .then((res) => res.json())
      .then((data) => {
        setAllPets(data);
        const foundPet = data.find((p) => p._id.$oid === id);
        setPet(foundPet);
        if (foundPet?.imageUrl?.length > 0) setMainImage(foundPet.imageUrl[0]);
      });

    // fetch shelters
    fetch("/data/shelters.json")
      .then((res) => res.json())
      .then((data) => setShelters(data));
  }, [id]);

  if (!pet) return <p className="text-center mt-10">Loading...</p>;

  const suggestedPets = allPets.filter(
    (p) =>
      p._id.$oid !== pet._id.$oid &&
      (p.species === pet.species ||
        p.breed === pet.breed ||
        p.location === pet.location)
  );

  const shelterInfo = shelters.find(
    (s) => s._id.$oid === pet.shelterId?.$oid
  );

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return "";
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="bg-base-100">
      <div className="max-w-7xl mx-auto px-4 py-36">
        {/* Back Button */}
        <button
          onClick={() => 
         router.back()}
          className="mb-6 px-5 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
        >
          ← Back to Pets
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* left: image + video   */}
          <div className="lg:w-1/2 flex flex-col gap-4">
            <img
              src={mainImage}
              alt={pet.name}
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />
            {pet.imageUrl?.length > 1 && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {pet.imageUrl.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Thumbnail ${idx}`}
                    className={`w-full h-24 object-cover rounded-md cursor-pointer border-2 ${
                      selectedImageIndex === idx
                        ? "border-green-600"
                        : "border-transparent"
                    }`}
                    onClick={() => {
                      setMainImage(img);
                      setSelectedImageIndex(idx);
                    }}
                  />
                ))}
              </div>
            )}

            {/* Video Card */}
            {pet.videoUrl && (
              <div className="bg-base-200 p-2 rounded-lg shadow-md mt-2">
                <h2 className="text-xl text-base-content font-semibold mb-2">Pet Videos</h2>
                <div className="w-full h-64 md:h-80">
                  <iframe
                    width="100%"
                    height="100%"
                    src={getYouTubeEmbedUrl(pet.videoUrl)}
                    title={pet.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-md"
                  ></iframe>
                </div>
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="lg:w-1/2 flex flex-col gap-6 text-base-content">
            <h1 className="text-3xl font-bold">{pet.name}</h1>
            <p className="text-lg">{pet.description}</p>

            {/* Health Info Table */}
            <div className="bg-base-300 p-6 rounded-lg shadow-sm overflow-x-auto mt-5">
              <h2 className="text-xl font-semibold mb-2">Health Information</h2>
              <table className="w-full table-auto border-collapse">
                <tbody>
                  <tr>
                    <td className="px-4 py-2 font-medium">Breed</td>
                    <td className="px-4 py-2">{pet.breed}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Age</td>
                    <td className="px-4 py-2">{pet.age}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Gender</td>
                    <td className="px-4 py-2">{pet.gender}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Size</td>
                    <td className="px-4 py-2">{pet.size}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Vaccinated</td>
                    <td className="px-4 py-2">{pet.vaccinated ? <div className="badge badge-soft badge-success"> <IoIosCheckmarkCircleOutline /> Yes</div> : <div className="badge badge-soft badge-warning"><RxCrossCircled /> No</div>}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Neutered</td>
                    <td className="px-4 py-2">{pet.neutered ? <div className="badge badge-soft badge-success"> <IoIosCheckmarkCircleOutline /> Yes</div> : <div className="badge badge-soft badge-warning"><RxCrossCircled /> No</div>}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Adoption Fee</td>
                    <td className="px-4 py-2">${pet.adoptionFee}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Shelter Info Table */}
            {shelterInfo && (
              <div className="bg-base-300 p-4 rounded-lg shadow-sm overflow-x-auto mt-5">
                <h2 className="text-xl text-base-content font-semibold mb-4">Shelter Information</h2>
                <table className="w-full table-auto border-collapse">
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 font-medium">Name</td>
                      <td className="px-4 py-2">{shelterInfo.shelterName}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium">Location</td>
                      <td className="px-4 py-2">{shelterInfo.location}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium">Email</td>
                      <td className="px-4 py-2">{shelterInfo.contactEmail}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium">Phone</td>
                      <td className="px-4 py-2">{shelterInfo.contactPhone}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Apply Button */}
            <button
              onClick={() => alert(`Applied to adopt ${pet.name}!`)}
              className="mt-4 px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
            >
              Apply for Adoption
            </button>
          </div>
        </div>

        {/* Suggested Pets */}
        {suggestedPets.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl text-base-content font-bold mb-6">Suggested Pets</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedPets.slice(0, 3).map((spet) => (
                <div
                  key={spet._id.$oid}
                  className="bg-base-300 rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={spet.imageUrl[0]}
                    alt={spet.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg text-base-content font-semibold">{spet.name}</h3>
                    <p className="text-sm text-base-content">{spet.species}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
