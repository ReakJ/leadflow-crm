import api from "../api/axios";

export async function getDashboard(period = "7d") {
  const { data } = await api.get("/dashboard", {
    params: {
      period,
    }
  })

  return data.data;
}