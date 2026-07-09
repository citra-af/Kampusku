import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";

import {
  getAllRencanaStudi,
  storeRencanaStudi,
  updateRencanaStudi,
  deleteRencanaStudi,
} from "@/Apis/RencanaStudiApi";

import {
  toastSuccess,
  toastError,
} from "@/Utils/Helpers/ToastHelpers";

// =========================
// GET
// =========================
export const useRencanaStudi = (query = {}) =>
  useQuery({
    queryKey: ["rencana-studi", query],

    queryFn: () => getAllRencanaStudi(query),

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
export const useStoreRencanaStudi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: storeRencanaStudi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rencana-studi"],
      });

      toastSuccess(
        "Rencana studi berhasil ditambahkan!"
      );
    },

    onError: () => {
      toastError(
        "Gagal menambahkan rencana studi."
      );
    },
  });
};

// =========================
// PUT
// =========================
export const useUpdateRencanaStudi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      updateRencanaStudi(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rencana-studi"],
      });

      toastSuccess(
        "Rencana studi berhasil diperbarui!"
      );
    },

    onError: () => {
      toastError(
        "Gagal memperbarui rencana studi."
      );
    },
  });
};

// =========================
// DELETE
// =========================
export const useDeleteRencanaStudi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRencanaStudi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rencana-studi"],
      });

      toastSuccess(
        "Rencana studi berhasil dihapus!"
      );
    },

    onError: () => {
      toastError(
        "Gagal menghapus rencana studi."
      );
    },
  });
};