import api from "../api/axios";

export async function getUsers(params = {}) {
  const response = await api.get("/users", {
    params,
  });

  return response.data;
}

export async function getUserById(id) {
  const response = await api.get(`/users/${id}`);

  return response.data;
}

export async function createUser(data) {
  const response = await api.post("/users", data);

  return response.data;
}

export async function updateUserStatus(id, isActive) {
  const response =  await api.patch(`/users/${id}/status`, {
    isActive,
  });

  return response.data;
}

export async function deleteUser(id) {
  const response = await api.delete(`/users/${id}`);

  return response.data;
}

export async function restoreUser(id) {
  const response = await api.patch(`/users/${id}/restore`);

  return response.data;
}

