import Button from "@/Pages/Admin/Components/Button";

const KelasTable = ({
  kelas = [],
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
            Nama Kelas
          </th>

          <th className="py-2 px-4 text-center">
            Semester
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
              colSpan={4}
              className="py-6 text-center"
            >
              Loading...
            </td>
          </tr>
        ) : kelas.length === 0 ? (
          <tr>
            <td
              colSpan={4}
              className="py-6 text-center"
            >
              Data kelas tidak ditemukan.
            </td>
          </tr>
        ) : (
          kelas.map((item, index) => (
            <tr
              key={item.id}
              className={
                index % 2 === 0
                  ? "bg-white"
                  : "bg-gray-100"
              }
            >
              <td className="py-2 px-4">
                {item.kode}
              </td>

              <td className="py-2 px-4">
                {item.nama}
              </td>

              <td className="py-2 px-4 text-center">
                {item.semester}
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

export default KelasTable;