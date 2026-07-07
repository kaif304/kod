import api from "./api";

export const createLead = async (payload) => {
  const { data } = await api.post("/leads", payload);
  return data;
};