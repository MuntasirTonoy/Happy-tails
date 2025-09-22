"use client";

export default function FilterBar({ search, setSearch, filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const badgeClass = "px-4 py-1 rounded-full bg-green-100 text-green-700 font-medium";

  return (
    <div className="max-w-7xl mx-auto bg-base-300 p-4 rounded-lg text-base-content shadow-sm mb-6">
      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search pets by keyword..."
        className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4 md:mb-0"
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mt-4">
        <select
          name="species"
          value={filters.species}
          onChange={handleChange}
          className={badgeClass}
        >
          <option value="">Species</option>
          <option>Dog</option>
          <option>Cat</option>
          <option>Rabbit</option>
        </select>

        <select
          name="breed"
          value={filters.breed}
          onChange={handleChange}
          className={badgeClass}
        >
          <option value="">Breed</option>
          <option>Labrador</option>
          <option>Persian</option>
          <option>German Shepherd</option>
          <option>Beagle</option>
        </select>

        <select
          name="age"
          value={filters.age}
          onChange={handleChange}
          className={badgeClass}
        >
          <option value="">Age</option>
          <option value="0-1">0-1</option>
          <option value="2-4">2-4</option>
          <option value="5+">5+</option>
        </select>

        <select
          name="gender"
          value={filters.gender}
          onChange={handleChange}
          className={badgeClass}
        >
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <select
          name="size"
          value={filters.size}
          onChange={handleChange}
          className={badgeClass}
        >
          <option value="">Size</option>
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
        </select>

        <select
          name="vaccinated"
          value={filters.vaccinated}
          onChange={handleChange}
          className={badgeClass}
        >
          <option value="">Vaccinated</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <select
          name="location"
          value={filters.location}
          onChange={handleChange}
          className={badgeClass}
        >
          <option value="">Location</option>
          <option>Dhaka</option>
          <option>Chittagong</option>
        </select>
      </div>
    </div>
  );
}
