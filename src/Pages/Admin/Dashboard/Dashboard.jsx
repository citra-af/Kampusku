import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";

import Card from "@/pages/Admin/Components/Card";
import Heading from "@/pages/Admin/Components/Heading";
import { useMahasiswa } from "@/Utils/Hooks/useMahasiswa";
import { useDosen } from "@/Utils/Hooks/useDosen";
import { useMataKuliah } from "@/Utils/Hooks/useMataKuliah";
import { useKelas } from "@/Utils/Hooks/useKelas";
import { useRencanaStudi } from "@/Utils/Hooks/useRencanaStudi";

const CHART_COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#1d4ed8"];

const Dashboard = () => {
  const queryParams = { _page: 1, _limit: 1000 };

  const { data: mahasiswaResult, isLoading: loadingMahasiswa } =
    useMahasiswa(queryParams);
  const { data: dosenResult, isLoading: loadingDosen } =
    useDosen(queryParams);
  const { data: matakuliahResult, isLoading: loadingMatakuliah } =
    useMataKuliah(queryParams);
  const { data: kelasResult, isLoading: loadingKelas } =
    useKelas(queryParams);
  const { data: rencanaStudiResult, isLoading: loadingRencanaStudi } =
    useRencanaStudi(queryParams);

  const isLoading =
    loadingMahasiswa ||
    loadingDosen ||
    loadingMatakuliah ||
    loadingKelas ||
    loadingRencanaStudi;

  const summaryData = useMemo(
    () => [
      { name: "Mahasiswa", jumlah: mahasiswaResult?.total ?? 0 },
      { name: "Dosen", jumlah: dosenResult?.total ?? 0 },
      { name: "Mata Kuliah", jumlah: matakuliahResult?.total ?? 0 },
      { name: "Kelas", jumlah: kelasResult?.total ?? 0 },
      { name: "Rencana Studi", jumlah: rencanaStudiResult?.total ?? 0 },
    ],
    [
      mahasiswaResult?.total,
      dosenResult?.total,
      matakuliahResult?.total,
      kelasResult?.total,
      rencanaStudiResult?.total,
    ]
  );

  const semesterData = useMemo(() => {
    const kelas = kelasResult?.data ?? [];
    const counts = kelas.reduce((acc, item) => {
      const key = `Semester ${item.semester}`;
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [kelasResult?.data]);

  const sksData = useMemo(() => {
    const matakuliah = matakuliahResult?.data ?? [];
    return matakuliah.map((mk) => ({
      name: mk.kode,
      sks: Number(mk.sks) || 0,
    }));
  }, [matakuliahResult?.data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <p className="text-gray-500 text-lg">Memuat data dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Heading as="h1" align="left" className="mb-0">
        Selamat Datang di Dashboard
      </Heading>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Chart 1: Bar Chart - Ringkasan Data */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Ringkasan Data Akademik
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={summaryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="jumlah" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Chart 2: Pie Chart - Distribusi Kelas per Semester */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Distribusi Kelas per Semester
          </h2>
          {semesterData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={semesterData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {semesterData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-16">
              Belum ada data kelas.
            </p>
          )}
        </Card>
      </div>

      {/* Chart 3: Line Chart - SKS Mata Kuliah */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          SKS per Mata Kuliah
        </h2>
        {sksData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sksData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="sks"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ fill: "#2563eb", r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 text-center py-16">
            Belum ada data mata kuliah.
          </p>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;
