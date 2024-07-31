import { API_URL } from "../utils/config";
export const StatisticsService = {
  getTotalRevenue: async () => {
    const token = localStorage.getItem("token");
    const link = `${API_URL}/admin/statistics/total-revenue`;
    const response = await fetch(link, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data.data;
  },

  getTotalOrders: async () => {
    const token = localStorage.getItem("token");
    const link = `${API_URL}/admin/statistics/total-orders`;
    const response = await fetch(link, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data.data;
  },

  getTotalProducts: async () => {
    const token = localStorage.getItem("token");
    const link = `${API_URL}/admin/statistics/total-products`;
    const response = await fetch(link, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data.data;
  },

  getTotalUsers: async () => {
    const token = localStorage.getItem("token");
    const link = `${API_URL}/admin/statistics/total-users`;
    const response = await fetch(link, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data.data;
  },

  getTopProducts: async () => {
    const token = localStorage.getItem("token");
    const link = `${API_URL}/admin/statistics/top-best-selling`;
    const response = await fetch(link, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();

    return data.data;
  },

  getMonthlyRevenue: async () => {
    const token = localStorage.getItem("token");
    const link = `${API_URL}/admin/statistics/monthly-revenue`;
    const response = await fetch(link, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data.data;
  },

  getTopLowerBooks: async () => {
    const token = localStorage.getItem("token");
    const link = `${API_URL}/public/books?limit=5&filter=inventory < 200`;
    const response = await fetch(link, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data.data;
  },
};
