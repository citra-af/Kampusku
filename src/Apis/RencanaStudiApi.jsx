import axios from "@/Utils/AxiosInstance";

export const getAllRencanaStudi = (params = {}) =>
  axios.get("/rencana_studi", {
    params,
  });

export const getRencanaStudi = (id) =>
  axios.get(`/rencana_studi/${id}`);

export const storeRencanaStudi = (data) =>
  axios.post("/rencana_studi", data);

export const updateRencanaStudi = (id, data) =>
  axios.put(`/rencana_studi/${id}`, data);

export const deleteRencanaStudi = (id) =>
  axios.delete(`/rencana_studi/${id}`);