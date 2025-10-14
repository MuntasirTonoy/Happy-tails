const API_BASE = "/api/admin";

export async function getAllUsers() {
  const res = await fetch(`${API_BASE}/users`);
  return res.json();
}

export async function getAllShelters() {
  const res = await fetch(`${API_BASE}/shelters`);
  return res.json();
}

export async function getAllPets() {
  const res = await fetch(`${API_BASE}/pets`);
  return res.json();
}

export async function getAllApplications() {
  const res = await fetch(`${API_BASE}/applications`);
  return res.json();
}

export async function getAllAnnouncements() {
  const res = await fetch(`${API_BASE}/announcements`);
  return res.json();
}

// CREATE
export async function createShelter(data) {
  const res = await fetch(`${API_BASE}/shelters`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// UPDATE
export async function updateShelter(id, data) {
  const res = await fetch(`${API_BASE}/shelters/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// DELETE
export async function deleteShelter(id) {
  const res = await fetch(`${API_BASE}/shelters/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
