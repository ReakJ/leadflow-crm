import api from "../api/axios";

export async function getLeads(params = {}) {
  const response = await api.get("/leads", {
    params,
  });

  return response.data;
}

export async function getLeadById(id) {
  const response = await api.get(`/leads/${id}`);

  return response.data;
}

export async function createLead(data) {
  const response = await api.post("/leads", data);

  return response.data;
}

export async function updateLead(id, data) {
  const response = await api.patch(`/leads/${id}/details`, data);

  return response.data;
}

export async function assignLead(id, assignedTo) {
  const response = await api.patch(`/leads/${id}/assign`, {
    assignedTo,
  });

  return response.data;
}

export async function changeLeadStatus(id, status) {
  const response = await api.patch(`/leads/${id}/status`, {
    status,
  });

  return response.data;
}

export async function addLeadNote(id, text) {
  const response = await api.post(`/leads/${id}/notes`, {
    text,
  });

  return response.data;
}

export async function deleteLead(id) {
  const response = await api.delete(`/leads/${id}`);

  return response.data;
}

export async function restoreLead(id) {
  const response = await api.patch(`/leads/${id}/restore`);

  return response.data;
}