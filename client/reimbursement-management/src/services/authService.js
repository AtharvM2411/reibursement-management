import api from "./api";

// login
export const login = async (data) => {
  const res = await api.post("/auth/login", data);

  // store token
  localStorage.setItem("token", res.data.token);

  return res.data;
};

// signup
export const signup = async (data) => {
  const res = await api.post("/auth/signup", data);
  return res.data;
};