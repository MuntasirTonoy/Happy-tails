import ShelterForm from "../../../../components/admin/ShelterForm";
import ShelterList from "../../../../components/admin/ShelterList";

export default function AdminSheltersPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Shelter Management</h1>
      <ShelterForm />
      <ShelterList />
    </div>
  );
}
