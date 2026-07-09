import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";

import {
  getAllKelas,
  storeKelas,
  updateKelas,
  deleteKelas,
} from "@/Apis/KelasApi";

import {
  toastSuccess,
  toastError,
} from "@/utils/Helpers/ToastHelpers";

// =========================
// GET
// =========================
export const useKelas = (query = {}) =>
  useQuery({
    queryKey: ["kelas", query],

    queryFn: () => getAllKelas(query),

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
export const useStoreKelas = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: storeKelas,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["kelas"],
      });

      toastSuccess("Data kelas berhasil ditambahkan!");
    },

    onError: () => {
      toastError("Gagal menambahkan data kelas.");
    },
  });
};

// =========================
// PUT
// =========================
export const useUpdateKelas = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      updateKelas(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["kelas"],
      });

      toastSuccess("Data kelas berhasil diperbarui!");
    },

    onError: () => {
      toastError("Gagal memperbarui data kelas.");
    },
  });
};

// =========================
// DELETE
// =========================
export const useDeleteKelas = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteKelas,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["kelas"],
      });

      toastSuccess("Data kelas berhasil dihapus!");
    },

    onError: () => {
      toastError("Gagal menghapus data kelas.");
    },
  });
};