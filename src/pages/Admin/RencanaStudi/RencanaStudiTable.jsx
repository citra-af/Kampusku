import Button from "@/pages/Admin/Components/Button";

const RencanaStudiTable = ({
  data = [],
  isLoading = false,
  openEditModal,
  onDelete,
}) => {
  return (
    <table className="w-full text-sm text-gray-700">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="py-2 px-4 text-left">
            Mahasiswa
          </th>

          <th className="py-2 px-4 text-left">
            Kelas
          </th>

          <th className="py-2 px-4 text-center">
            Jumlah MK
          </th>

          <th className="py-2 px-4 text-center">
            Total SKS
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
              colSpan={5}
              className="text-center py-6"
            >
              Loading...
            </td>
          </tr>
        ) : data.length === 0 ? (
          <tr>
            <td
              colSpan={5}
              className="text-center py-6"
            >
              Data rencana studi tidak ditemukan.
            </td>
          </tr>
        ) : (
          data.map((item) => (
            <tr
              key={item.id}
              className="border-b"
            >
              <td className="py-2 px-4">
                {item.mahasiswaNama}
              </td>

              <td className="py-2 px-4">
                {item.kelasNama}
              </td>

              <td className="py-2 px-4 text-center">
                {item.mataKuliahIds?.length || 0}
              </td>

              <td className="py-2 px-4 text-center">
                {item.totalSks}
              </td>

              <td className="py-2 px-4 text-center space-x-2">
                <Button
                  size="sm"
                  variant="warning"
                  onClick={() =>
                    openEditModal(item)
                  }
                >
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  onClick={() =>
                    onDelete(item.id)
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

export default RencanaStudiTable;