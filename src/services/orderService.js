import { API_URL } from "../utils/config";

export const getOrders = async (page = 1) => {
  const res = await fetch(`${API_URL}/admin/orders?limit=10&page=${page}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.json();
};

export const updateOrder = async (id, data) => {
  const sendData = {
    id,
    status: data.status,
    address: data.shippingAddress,
  }
  const res = await fetch(`${API_URL}/admin/orders`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(sendData),
  });
  return res.json();
};

export const getOrder = async (id) => {
  const res = await fetch(`${API_URL}/admin/orders/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.json();
};
