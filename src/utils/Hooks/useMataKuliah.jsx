import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";

import {
  getAllMataKuliah,
  storeMataKuliah,
  updateMataKuliah,
  deleteMataKuliah,
} from "@/Apis/MataKuliahApi";

import {
  toastSuccess,
  toastError,
} from "@/utils/Helpers/ToastHelpers";

// =========================
// GET
// =========================
export const useMataKuliah = (query = {}) =>
  useQuery({
    queryKey: ["matakuliah", query],

    queryFn: () => getAllMataKuliah(query),

    select: (res) => ({
      data: res?.data ?? [],
      total: parseInt(
        res.headers["x-total-count"] ?? "0",
        10
      ),
    }),

    placeholderData: keepPreviousData,
  });

// =========================
// POST
// =========================
export const useStoreMataKuliah = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: storeMataKuliah,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["matakuliah"],
      });

      toastSuccess("Data mata kuliah berhasil ditambahkan!");
    },

    onError: () => {
      toastError("Gagal menambahkan data mata kuliah.");
    },
  });
};

// =========================
// PUT
// =========================
export const useUpdateMataKuliah = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      updateMataKuliah(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["matakuliah"],
      });

      toastSuccess("Data mata kuliah berhasil diperbarui!");
    },

    onError: () => {
      toastError("Gagal memperbarui data mata kuliah.");
    },
  });
};

// =========================
// DELETE
// =========================
export const useDeleteMataKuliah = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMataKuliah,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["matakuliah"],
      });

      toastSuccess("Data mata kuliah berhasil dihapus!");
    },

    onError: () => {
      toastError("Gagal menghapus data mata kuliah.");
    },
  });
};