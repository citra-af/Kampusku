import Button from "@/Pages/Admin/Components/Button";

const DosenTable = ({
  dosen = [],
  isLoading = false,
  openEditModal,
  onDelete,
}) => {
  return (
    <table className="w-full text-sm text-gray-700">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="py-2 px-4 text-left">
            NIDN
          </th>

          <th className="py-2 px-4 text-left">
            Nama
          </th>

          <th className="py-2 px-4 text-center">
            Aksi
          </th>
        </tr>
      </thead>

      <tbody>
        {isLoading ? (
          <tr>
            <td colSpan={3} className="py-6 text-center">
              Loading...
            </td>
          </tr>
        ) : dosen.length === 0 ? (
          <tr>
            <td colSpan={3} className="py-6 text-center">
              Data dosen tidak ditemukan.
            </td>
          </tr>
        ) : (
          dosen.map((dsn, index) => (
            <tr
              key={dsn.id}
              className={
                index % 2 === 0
                  ? "bg-white"
                  : "bg-gray-100"
              }
            >
              <td className="py-2 px-4">
                {dsn.nidn}
              </td>

              <td className="py-2 px-4">
                {dsn.nama}
              </td>

              <td className="py-2 px-4 text-center space-x-2">
                <Button
                  size="sm"
                  variant="warning"
                  onClick={() =>
                    openEditModal(dsn)
                  }
                >
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  onClick={() =>
                    onDelete(dsn.id)
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

export default DosenTable;