export default function Pets() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">My Pets</h1>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="text-left bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Species</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-2">Buddy</td>
            <td className="p-2">Dog</td>
            <td className="p-2 text-green-600">Available</td>
            <td className="p-2 text-blue-500 cursor-pointer">Edit</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
