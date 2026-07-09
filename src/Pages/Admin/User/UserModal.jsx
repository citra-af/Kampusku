import { useEffect, useState } from "react";

import Button from "@/Pages/Admin/Components/Button";

const UserModal = ({
  isModalOpen,
  onClose,
  onSubmit,
  selectedUser,
}) => {
  const [role, setRole] = useState("");

  useEffect(() => {
    if (selectedUser) {
      setRole(selectedUser.role);
    }
  }, [selectedUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(role);
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">
            Ubah Role User
          </h2>

          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 text-xl"
          >
            &times;
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-4 space-y-4"
        >
          <div>
            <label className="block mb-2 font-medium">
              Nama
            </label>

            <input
              type="text"
              value={selectedUser?.name || ""}
              readOnly
              className="w-full border rounded px-3 py-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="text"
              value={selectedUser?.email || ""}
              readOnly
              className="w-full border rounded px-3 py-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Role
            </label>

            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
              className="w-full border rounded px-3 py-2"
            >
              <option value="admin">
                Admin
              </option>

              <option value="dosen">
                Dosen
              </option>

              <option value="mahasiswa">
                Mahasiswa
              </option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Batal
            </Button>

            <Button type="submit">
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;