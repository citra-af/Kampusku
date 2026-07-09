import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";

import {
  getAllUsers,
  updateUser,
} from "@/Apis/UserApi";

import {
  toastSuccess,
  toastError,
} from "@/Utils/Helpers/ToastHelpers";

// =========================
// GET
// =========================
export const useUser = (query = {}) =>
  useQuery({
    queryKey: ["user", query],

    queryFn: () => getAllUsers(query),

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
// UPDATE ROLE
// =========================
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      updateUser(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });

      toastSuccess("Role berhasil diperbarui");
    },

    onError: () => {
      toastError("Gagal memperbarui role");
    },
  });
};