import { useState } from "react";

import {
  confirmDelete,
  confirmUpdate,
} from "@/utils/Helpers/SwalHelpers";

import { toastError } from "@/utils/Helpers/ToastHelpers";

import {
  useDosen,
  useStoreDosen,
  useUpdateDosen,
  useDeleteDosen,
} from "@/utils/Hooks/useDosen";

import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";

import DosenTable from "@/Pages/Admin/Dosen/DosenTable";
import DosenModal from "@/Pages/Admin/Dosen/DosenModal";

const Dosen = () => {
  const [selectedDosen, setSelectedDosen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ==========================
  // PAGINATION STATE
  // ==========================
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sortBy, setSortBy] = useState("nama");
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");

  // ==========================
  // REACT QUERY
  // ==========================
  const {
    data: result = {
      data: [],
      total: 0,
    },
    isLoading: isLoadingDosen,
  } = useDosen({
    q: search,
    _sort: sortBy,
    _order: sortOrder,
    _page: page,
    _limit: limit,
  });

  const { data: dosen = [] } = result;

  const totalCount = result.total;
  const totalPages = Math.ceil(totalCount / limit);

  const { mutate: store } = useStoreDosen();
  const { mutate: update } = useUpdateDosen();
  const { mutate: remove } = useDeleteDosen();

  // ==========================
  // MODAL CONTROL
  // ==========================
  const openAddModal = () => {
    setSelectedDosen(null);
    setIsModalOpen(true);
  };

  const openEditModal = (dsn) => {
    setSelectedDosen(dsn);
    setIsModalOpen(true);
  };

  // ==========================
  // CREATE & UPDATE
  // ==========================
  const handleSubmit = (formData) => {
    if (selectedDosen) {
      confirmUpdate(() => {
        update(
          {
            id: formData.id,
            data: formData,
          },
          {
            onSuccess: () => {
              setIsModalOpen(false);
            },
          }
        );
      });

      return;
    }

    const exists = dosen.find(
      (d) => d.nidn === formData.nidn
    );

    if (exists) {
      toastError("NIDN sudah terdaftar!");
      return;
    }

    store(formData, {
      onSuccess: () => {
        setIsModalOpen(false);
      },
    });
  };

  // ==========================
  // DELETE
  // ==========================
  const handleDelete = (id) => {
    confirmDelete(() => {
      remove(id);
    });
  };

  // ==========================
  // PAGINATION
  // ==========================
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
            Daftar Dosen
          </Heading>

          <Button onClick={openAddModal}>
            + Tambah Dosen
          </Button>
        </div>

        {/* ==========================
            SEARCH, SORT & LIMIT
        ========================== */}
        <div className="flex flex-wrap gap-2 mb-4">
          {/* SEARCH */}
          <input
            type="text"
            placeholder="Cari Nama / NIDN..."
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
            <option value="nama">Sort Nama</option>
            <option value="nidn">Sort NIDN</option>
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
        <DosenTable
          dosen={dosen}
          isLoading={isLoadingDosen}
          openEditModal={openEditModal}
          onDelete={handleDelete}
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
            <Button
              variant="secondary"
              onClick={handlePrev}
              disabled={page === 1}
            >
              Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={
                page === totalPages ||
                totalPages === 0
              }
            >
              Next
            </Button>
          </div>
        </div>
      </Card>

      <DosenModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        selectedDosen={selectedDosen}
      />
          </>
  );
};

export default Dosen;