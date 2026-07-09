import { useState } from "react";

import {
  useRencanaStudi,
  useStoreRencanaStudi,
  useUpdateRencanaStudi,
  useDeleteRencanaStudi,
} from "@/Utils/Hooks/useRencanaStudi";

import { useMahasiswa } from "@/Utils/Hooks/useMahasiswa";
import { useKelas } from "@/Utils/Hooks/useKelas";
import { useMataKuliah } from "@/Utils/Hooks/useMataKuliah";

import Card from "@/pages/Admin/Components/Card";
import Heading from "@/pages/Admin/Components/Heading";
import Button from "@/pages/Admin/Components/Button";

import {
  confirmDelete,
  confirmUpdate,
} from "@/Utils/Helpers/SwalHelpers";

import RencanaStudiTable from "./RencanaStudiTable";
import RencanaStudiModal from "./RencanaStudiModal";

const RencanaStudi = () => {
  const [selectedData, setSelectedData] =
    useState(null);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  // ==========================
  // REACT QUERY
  // ==========================
  const {
    data: rsResult = {
      data: [],
    },
    isLoading,
  } = useRencanaStudi();

  const {
    data: mahasiswaResult = {
      data: [],
    },
  } = useMahasiswa();

  const {
    data: kelasResult = {
      data: [],
    },
  } = useKelas();

  const {
    data: mkResult = {
      data: [],
    },
  } = useMataKuliah();

  const mahasiswa =
    mahasiswaResult.data || [];

  const kelas =
    kelasResult.data || [];

  const matakuliah =
    mkResult.data || [];

  const rencanaStudi =
    rsResult.data || [];

  const { mutate: store } =
    useStoreRencanaStudi();

  const { mutate: update } =
    useUpdateRencanaStudi();

  const { mutate: remove } =
    useDeleteRencanaStudi();

  // ==========================
  // RELASI DATA
  // ==========================
  const data = rencanaStudi.map((item) => {
    const mahasiswaData =
      mahasiswa.find(
        (m) => m.id === item.mahasiswaId
      );

    const kelasData =
      kelas.find(
        (k) => k.id === item.kelasId
      );

    const totalSks =
      item.mataKuliahIds?.reduce(
        (total, idMk) => {
          const mk =
            matakuliah.find(
              (m) => m.id === idMk
            );

          return (
            total + Number(mk?.sks || 0)
          );
        },
        0
      ) || 0;

    return {
      ...item,
      mahasiswaNama:
        mahasiswaData?.nama || "-",
      kelasNama:
        kelasData?.nama || "-",
      totalSks,
    };
  });

  // ==========================
  // MODAL
  // ==========================
  const openAddModal = () => {
    setSelectedData(null);
    setIsModalOpen(true);
  };

  const openEditModal = (data) => {
    setSelectedData(data);
    setIsModalOpen(true);
  };

  // ==========================
  // SUBMIT
  // ==========================
  const handleSubmit = (formData) => {
    if (selectedData) {
      confirmUpdate(() => {
        update(
          {
            id: selectedData.id,
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

  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2">
            Rencana Studi
          </Heading>

          <Button onClick={openAddModal}>
            + Tambah Rencana Studi
          </Button>
        </div>

        <RencanaStudiTable
          data={data}
          isLoading={isLoading}
          openEditModal={openEditModal}
          onDelete={handleDelete}
        />
      </Card>

      <RencanaStudiModal
        isModalOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        onSubmit={handleSubmit}
        selectedData={selectedData}
        mahasiswa={mahasiswa}
        kelas={kelas}
        matakuliah={matakuliah}
      />
    </>
  );
};

export default RencanaStudi;