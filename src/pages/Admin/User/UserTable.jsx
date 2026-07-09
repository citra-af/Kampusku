import Button from "@/Pages/Admin/Components/Button";

const UserTable = ({
  users = [],
  isLoading = false,
  openEditModal,
}) => {
  return (
    <table className="w-full text-sm text-gray-700">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="py-2 px-4 text-left">
            Nama
          </th>

          <th className="py-2 px-4 text-left">
            Email
          </th>

          <th className="py-2 px-4 text-left">
            Role
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
        ) : users.length === 0 ? (
          <tr>
            <td
              colSpan={4}
              className="py-6 text-center"
            >
              Data user tidak ditemukan.
            </td>
          </tr>
        ) : (
          users.map((user, index) => (
            <tr
              key={user.id}
              className={
                index % 2 === 0
                  ? "bg-white"
                  : "bg-gray-100"
              }
            >
              <td className="py-2 px-4">
                {user.name}
              </td>

              <td className="py-2 px-4">
                {user.email}
              </td>

              <td className="py-2 px-4">
                {user.role}
              </td>

              <td className="py-2 px-4 text-center">
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() =>
                    openEditModal(user)
                  }
                >
                  Edit Role
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default UserTable;