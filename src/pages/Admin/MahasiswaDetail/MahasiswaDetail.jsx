import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";

import { getMahasiswa } from "@/Apis/MahasiswaApi";

import axios from "@/Utils/AxiosInstance";

import { toastError } from "@/Utils/Helpers/ToastHelpers";

const MahasiswaDetail = () => {
  const { id } = useParams();

  const [mahasiswa, setMahasiswa] = useState(null);
  const [kelas, setKelas] = useState(null);
  const [mataKuliah, setMataKuliah] = useState([]);
  const [totalSks, setTotalSks] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const mahasiswaRes = await getMahasiswa(id);

      setMahasiswa(mahasiswaRes.data);

      const rsRes = await axios.get(
        `/rencana_studi?mahasiswa_id=${id}`
      );

      if (rsRes.data.length > 0) {
        const rs = rsRes.data[0];

        const kelasRes = await axios.get(
          `/kelas/${rs.kelas_id}`
        );

        setKelas(kelasRes.data);

        const matkulRequests =
          rs.matakuliah_ids.map((mkId) =>
            axios.get(`/matakuliah/${mkId}`)
          );

        const matkulResponses =
          await Promise.all(matkulRequests);

        const matkulData =
          matkulResponses.map(
            (res) => res.data
          );

        setMataKuliah(matkulData);

        const total =
          matkulData.reduce(
            (sum, mk) =>
              sum + Number(mk.sks || 0),
            0
          );

        setTotalSks(total);
      }
    } catch (err) {
      console.error(err);

      toastError(
        "Gagal mengambil data mahasiswa"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <p className="text-center">
        Memuat data...
      </p>
    );
  }

  if (!mahasiswa) {
    return (
      <p className="text-center text-red-600">
        Data mahasiswa tidak ditemukan
      </p>
    );
  }

  return (
    <Card>
      <Heading
        as="h2"
        className="mb-4 text-left"
      >
        Detail Mahasiswa
      </Heading>

      <table className="table-auto text-sm w-full mb-6">
        <tbody>
          <tr>
            <td className="py-2 px-4 font-medium">
              NIM
            </td>
            <td className="py-2 px-4">
              {mahasiswa.nim}
            </td>
          </tr>

          <tr>
            <td className="py-2 px-4 font-medium">
              Nama
            </td>
            <td className="py-2 px-4">
              {mahasiswa.nama}
            </td>
          </tr>

          <tr>
            <td className="py-2 px-4 font-medium">
              Maksimal SKS
            </td>
            <td className="py-2 px-4">
              {mahasiswa.max_sks}
            </td>
          </tr>

          <tr>
            <td className="py-2 px-4 font-medium">
              Kelas
            </td>
            <td className="py-2 px-4">
              {kelas?.nama || "-"}
            </td>
          </tr>
        </tbody>
      </table>

      <Heading
        as="h3"
        className="mb-3 text-left"
      >
        Mata Kuliah Diambil
      </Heading>

      {mataKuliah.length === 0 ? (
        <p className="text-gray-500">
          Belum mengambil mata kuliah
        </p>
      ) : (
        <table className="w-full text-sm border">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-2 text-left">
                Kode
              </th>

              <th className="p-2 text-left">
                Mata Kuliah
              </th>

              <th className="p-2 text-center">
                SKS
              </th>
            </tr>
          </thead>

          <tbody>
            {mataKuliah.map((mk) => (
              <tr key={mk.id}>
                <td className="p-2">
                  {mk.kode}
                </td>

                <td className="p-2">
                  {mk.nama}
                </td>

                <td className="p-2 text-center">
                  {mk.sks}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="mt-6 space-y-2">
        <p>
          <strong>Total SKS :</strong>{" "}
          {totalSks}
        </p>

        <p>
          <strong>Sisa SKS :</strong>{" "}
          {(mahasiswa.max_sks || 0) -
            totalSks}
        </p>
      </div>
    </Card>
  );
};

export default MahasiswaDetail;