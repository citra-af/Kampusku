import Button from "@/pages/Admin/Components/Button";

const MataKuliahTable = ({
  matakuliah = [],
  isLoading = false,
  openEditModal,
  onDelete,
}) => {
  return (
    <table className="w-full text-sm text-gray-700">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="py-2 px-4 text-left">
            Kode
          </th>

          <th className="py-2 px-4 text-left">
            Nama Mata Kuliah
          </th>

          <th className="py-2 px-4 text-center">
            Aksi
          </th>
        </tr>
      </thead>

      <tbody>
        {isLoading ? (
          <tr>
            <td
              colSpan={3}
              className="py-6 text-center"
            >
              Loading...
            </td>
          </tr>
        ) : matakuliah.length === 0 ? (
          <tr>
            <td
              colSpan={3}
              className="py-6 text-center"
            >
              Data mata kuliah tidak ditemukan.
            </td>
          </tr>
        ) : (
          matakuliah.map((mk, index) => (
            <tr
              key={mk.id}
              className={
                index % 2 === 0
                  ? "bg-white"
                  : "bg-gray-100"
              }
            >
              <td className="py-2 px-4">
                {mk.kode}
              </td>

              <td className="py-2 px-4">
                {mk.nama}
              </td>

              <td className="py-2 px-4 text-center space-x-2">
                <Button
                  size="sm"
                  variant="warning"
                  onClick={() =>
                    openEditModal(mk)
                  }
                >
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  onClick={() =>
                    onDelete(mk.id)
                  }
                >
                  Hapus
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default MataKuliahTable;