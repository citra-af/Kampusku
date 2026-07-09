import { useState } from "react";

import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";

import UserTable from "@/Pages/Admin/User/UserTable";
import UserModal from "@/Pages/Admin/User/UserModal";

import {
  useUser,
  useUpdateUser,
} from "@/utils/Hooks/useUser";

const User = () => {
  const [selectedUser, setSelectedUser] =
    useState(null);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  // ==========================
  // PAGINATION STATE
  // ==========================
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] =
    useState("asc");
  const [search, setSearch] = useState("");

  // ==========================
  // REACT QUERY
  // ==========================
  const {
    data: result = {
      data: [],
      total: 0,
    },
    isLoading,
  } = useUser({
    q: search,
    _sort: sortBy,
    _order: sortOrder,
    _page: page,
    _limit: limit,
  });

  const { data: users = [] } = result;

  const totalCount = result.total;
  const totalPages = Math.ceil(totalCount / limit);

  const { mutate: update } =
    useUpdateUser();

  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleUpdateRole = (role) => {
    let permission = [];

    if (role === "admin") {
      permission = [
    "dashboard.page",
    "mahasiswa.page",
    "dosen.page",
    "matakuliah.page",
    "kelas.page",
    "rencanastudi.page",
    "user.page",
];
    }

    if (role === "dosen") {
        permission = [
    "dashboard.page",
    "matakuliah.page",
    "kelas.page",
    "rencanastudi.page",
  ];
    }

    if (role === "mahasiswa") {
      permission = [
        "dashboard.page",
      ];
    }

    const updatedUser = {
      ...selectedUser,
      role,
      permission,
    };

    update(
      {
        id: selectedUser.id,
        data: updatedUser,
      },
      {
        onSuccess: () => {
          setIsModalOpen(false);
        },
      }
    );
  };

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setPage((prev) =>
      Math.min(prev + 1, totalPages)
    );
  };
    return (
    <>
      <Card>
        {/* ==========================
            HEADER
        ========================== */}
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2" className="mb-0 text-left">
            Manajemen User
          </Heading>
        </div>

        {/* ==========================
            SEARCH, SORT & LIMIT
        ========================== */}
        <div className="flex flex-wrap gap-2 mb-4">
          {/* SEARCH */}
          <input
            type="text"
            placeholder="Cari Nama / Email..."
            className="border px-3 py-2 rounded-lg flex-1 min-w-[220px]"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          {/* SORT BY */}
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(1);
            }}
            className="border px-3 py-2 rounded-lg"
          >
            <option value="name">Sort Nama</option>
            <option value="email">Sort Email</option>
            <option value="role">Sort Role</option>
          </select>

          {/* SORT ORDER */}
          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              setPage(1);
            }}
            className="border px-3 py-2 rounded-lg"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>

          {/* LIMIT */}
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="border px-3 py-2 rounded-lg"
          >
            <option value={5}>5 / halaman</option>
            <option value={10}>10 / halaman</option>
            <option value={25}>25 / halaman</option>
          </select>
        </div>

        {/* ==========================
            TABLE
        ========================== */}
        <UserTable
          users={users}
          isLoading={isLoading}
          openEditModal={openEditModal}
        />

        {/* ==========================
            PAGINATION
        ========================== */}
        <div className="flex justify-between items-center mt-5">
          <p className="text-sm text-gray-600">
            Halaman <strong>{page}</strong> dari{" "}
            <strong>{totalPages || 1}</strong>
          </p>

          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={
                page === totalPages ||
                totalPages === 0
              }
              className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </Card>

      <UserModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUpdateRole}
        selectedUser={selectedUser}
      />
          </>
  );
};

export default User;