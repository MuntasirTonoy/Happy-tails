export default function Applications() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Adoption Applications</h1>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="text-left bg-gray-200">
            <th className="p-2">Applicant</th>
            <th className="p-2">Pet</th>
            <th className="p-2">Status</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-2">Sarah</td>
            <td className="p-2">Buddy</td>
            <td className="p-2 text-yellow-600">Pending</td>
            <td className="p-2">01/03/2025</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
