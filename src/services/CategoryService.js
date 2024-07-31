import { API_URL } from "../utils/config";

export async function getAllCategories() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/public/categories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data.data;
}

export async function createCategory(data) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/admin/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
}

export async function getCategory(id) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/public/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data.data;
}

export async function updateCategory(data) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/admin/categories`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
}

export async function deleteCategory(id) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/admin/categories/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
