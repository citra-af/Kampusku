import Button from "@/Pages/Admin/Components/Button";

const MahasiswaTable = ({
  mahasiswa = [],
  isLoading = false,
  openEditModal,
  onDelete,
  onDetail,
}) => {
  return (
    <table className="w-full text-sm text-gray-700">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="py-2 px-4 text-left">
            NIM
          </th>

          <th className="py-2 px-4 text-left">
            Nama
          </th>

          <th className="py-2 px-4 text-center">
            Max SKS
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
        ) : mahasiswa.length === 0 ? (
          <tr>
            <td
              colSpan={4}
              className="py-6 text-center"
            >
              Data mahasiswa tidak ditemukan.
            </td>
          </tr>
        ) : (
          mahasiswa.map((mhs, index) => (
            <tr
              key={mhs.id}
              className={
                index % 2 === 0
                  ? "bg-white"
                  : "bg-gray-100"
              }
            >
              <td className="py-2 px-4">
                {mhs.nim}
              </td>

              <td className="py-2 px-4">
                {mhs.nama}
              </td>

              <td className="py-2 px-4 text-center">
                {mhs.max_sks}
              </td>

              <td className="py-2 px-4 text-center space-x-2">
                <Button
                  size="sm"
                  variant="info"
                  onClick={() =>
                    onDetail(mhs.id)
                  }
                >
                  Detail
                </Button>

                <Button
                  size="sm"
                  variant="warning"
                  onClick={() =>
                    openEditModal(mhs)
                  }
                >
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  onClick={() =>
                    onDelete(mhs.id)
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

export default MahasiswaTable;