import api from "../api/axios";

export async function login(credentials) {
  const { data } = await api.post("/auth/login", credentials);

  return data.data.user;
}

export async function logout() {
  await api.post("/auth/logout");
}

export async function getCurrentUser() {
  const { data } = await api.get("/auth/me");

  return data.data.user;
}