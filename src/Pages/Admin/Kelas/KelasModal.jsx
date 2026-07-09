import { useEffect, useState } from "react";

import Input from "@/Pages/Auth/Components/Input";
import Label from "@/Pages/Auth/Components/Label";
import Button from "@/Pages/Auth/Components/Button";

import { useDosen } from "@/utils/Hooks/useDosen";
import { useMataKuliah } from "@/utils/Hooks/useMataKuliah";

const KelasModal = ({
  isModalOpen,
  onClose,
  onSubmit,
  selectedKelas,
}) => {
  const [form, setForm] = useState({
    kode: "",
    nama: "",
    semester: "",
    dosenId: "",
    matakuliahId: "",
  });

  const { data: dosenResult = { data: [] } } =
    useDosen();

  const { data: matkulResult = { data: [] } } =
    useMataKuliah();

  const dosen = dosenResult.data || [];
  const matakuliah = matkulResult.data || [];

  useEffect(() => {
    if (selectedKelas) {
      setForm(selectedKelas);
    } else {
      setForm({
        kode: "",
        nama: "",
        semester: "",
        dosenId: "",
        matakuliahId: "",
      });
    }
  }, [selectedKelas]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.kode ||
      !form.nama ||
      !form.semester ||
      !form.dosenId ||
      !form.matakuliahId
    ) {
      alert("Semua field wajib diisi");
      return;
    }

    onSubmit(form);
    onClose();
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">

        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">
            {selectedKelas
              ? "Edit Kelas"
              : "Tambah Kelas"}
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
            <Label htmlFor="kode">
              Kode Kelas
            </Label>

            <Input
              type="text"
              name="kode"
              value={form.kode}
              onChange={handleChange}
              readOnly={selectedKelas}
              placeholder="Masukkan Kode Kelas"
              required
            />
          </div>

          <div>
            <Label htmlFor="nama">
              Nama Kelas
            </Label>

            <Input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Masukkan Nama Kelas"
              required
            />
          </div>

          <div>
            <Label htmlFor="semester">
              Semester
            </Label>

            <Input
              type="number"
              name="semester"
              value={form.semester}
              onChange={handleChange}
              placeholder="Masukkan Semester"
              required
            />
          </div>

          <div>
            <Label>Dosen Pengampu</Label>

            <select
              name="dosenId"
              value={form.dosenId}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg"
              required
            >
              <option value="">
                Pilih Dosen
              </option>

              {dosen.map((dsn) => (
                <option
                  key={dsn.id}
                  value={dsn.id}
                >
                  {dsn.nama}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Mata Kuliah</Label>

            <select
              name="matakuliahId"
              value={form.matakuliahId}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg"
              required
            >
              <option value="">
                Pilih Mata Kuliah
              </option>

              {matakuliah.map((mk) => (
                <option
                  key={mk.id}
                  value={mk.id}
                >
                  {mk.nama} ({mk.sks} SKS)
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
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

export default KelasModal;