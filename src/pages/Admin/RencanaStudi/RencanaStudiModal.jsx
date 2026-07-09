import { useEffect, useState } from "react";

import Button from "@/pages/Admin/Components/Button";

const RencanaStudiModal = ({
  isModalOpen,
  onClose,
  onSubmit,
  selectedData,
  mahasiswa = [],
  kelas = [],
  matakuliah = [],
}) => {
  const [form, setForm] = useState({
    mahasiswaId: "",
    kelasId: "",
    mataKuliahIds: [],
  });

  useEffect(() => {
    if (selectedData) {
      setForm({
        mahasiswaId:
          selectedData.mahasiswaId,
        kelasId:
          selectedData.kelasId,
        mataKuliahIds:
          selectedData.mataKuliahIds || [],
      });
    } else {
      setForm({
        mahasiswaId: "",
        kelasId: "",
        mataKuliahIds: [],
      });
    }
  }, [selectedData]);

  const handleCheckbox = (id) => {
    const exists =
      form.mataKuliahIds.includes(id);

    if (exists) {
      setForm({
        ...form,
        mataKuliahIds:
          form.mataKuliahIds.filter(
            (mkId) => mkId !== id
          ),
      });
    } else {
      setForm({
        ...form,
        mataKuliahIds: [
          ...form.mataKuliahIds,
          id,
        ],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.mahasiswaId ||
      !form.kelasId ||
      form.mataKuliahIds.length === 0
    ) {
      alert(
        "Mahasiswa, kelas, dan mata kuliah wajib dipilih"
      );
      return;
    }

    onSubmit(form);
  };

  const selectedMahasiswa =
    mahasiswa.find(
      (m) => m.id === form.mahasiswaId
    );

  const totalSks =
    matakuliah
      .filter((mk) =>
        form.mataKuliahIds.includes(
          mk.id
        )
      )
      .reduce(
        (total, mk) =>
          total + Number(mk.sks),
        0
      );

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl shadow-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">
            {selectedData
              ? "Edit Rencana Studi"
              : "Tambah Rencana Studi"}
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-4 space-y-4"
        >
          {/* Mahasiswa */}
          <div>
            <label className="block mb-1 font-medium">
              Mahasiswa
            </label>

            <select
              value={form.mahasiswaId}
              onChange={(e) =>
                setForm({
                  ...form,
                  mahasiswaId:
                    e.target.value,
                })
              }
              className="border rounded-lg w-full p-2"
            >
              <option value="">
                Pilih Mahasiswa
              </option>

              {mahasiswa.map((mhs) => (
                <option
                  key={mhs.id}
                  value={mhs.id}
                >
                  {mhs.nama}
                </option>
              ))}
            </select>

            {selectedMahasiswa && (
              <div className="mt-2 p-3 bg-blue-50 rounded-lg text-sm">
                <p>
                  <strong>NIM :</strong>{" "}
                  {
                    selectedMahasiswa.nim
                  }
                </p>

                <p>
                  <strong>
                    Maksimal SKS :
                  </strong>{" "}
                  {
                    selectedMahasiswa.max_sks
                  }
                </p>
              </div>
            )}
          </div>

          {/* Kelas */}
          <div>
            <label className="block mb-1 font-medium">
              Kelas
            </label>

            <select
              value={form.kelasId}
              onChange={(e) =>
                setForm({
                  ...form,
                  kelasId:
                    e.target.value,
                })
              }
              className="border rounded-lg w-full p-2"
            >
              <option value="">
                Pilih Kelas
              </option>

              {kelas.map((kls) => (
                <option
                  key={kls.id}
                  value={kls.id}
                >
                  {kls.nama}
                </option>
              ))}
            </select>
          </div>

          {/* Mata Kuliah */}
          <div>
            <label className="block mb-2 font-medium">
              Mata Kuliah
            </label>

            <div className="grid grid-cols-2 gap-2 border rounded-lg p-3 max-h-60 overflow-y-auto">
              {matakuliah.map((mk) => (
                <label
                  key={mk.id}
                  className="flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    checked={form.mataKuliahIds.includes(
                      mk.id
                    )}
                    onChange={() =>
                      handleCheckbox(
                        mk.id
                      )
                    }
                  />

                  {mk.nama} ({mk.sks} SKS)
                </label>
              ))}
            </div>
          </div>

          {/* Informasi SKS */}
          <div className="bg-blue-50 p-3 rounded-lg">
            <p>
              <strong>
                Total SKS Dipilih :
              </strong>{" "}
              {totalSks}
            </p>

            {selectedMahasiswa && (
              <p>
                <strong>
                  Batas Maksimal SKS :
                </strong>{" "}
                {
                  selectedMahasiswa.max_sks
                }
              </p>
            )}
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

export default RencanaStudiModal;