import { toast } from "react-hot-toast";

const options = {
  duration: 3000,
};

export const toastSuccess = (message) =>
  toast.success(message, options);

export const toastError = (message) =>
  toast.error(message, options);

export const toastInfo = (message) =>
  toast(message, options);