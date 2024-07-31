import { API_URL } from "../utils/config";
export async function getMe() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function updateMe(data) {
  const form = new FormData();
  form.append("name", data.name);
  form.append("file", data.file[0]);
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/users/update-profile`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: form,
  });
  const res = await response.json();
  return res;
}

export async function getUsers(page) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/admin/users?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function updateUser(id, data) {
  const sendData = {
    id,
    active: data.active
  }
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/admin/users`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(sendData),
  });
  const res = await response.json();
  return res;
}

export async function getOrder() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/users/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json()
}
