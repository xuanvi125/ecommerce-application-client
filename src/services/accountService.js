import { API_URL } from "../utils/config";

export const addAccount = async (account) => {
  const res = await fetch(`${API_URL}/bank-accounts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(account),
  });
  return res.json();
};

export const getAccounts = async (page) => {
  const res = await fetch(`${API_URL}/bank-accounts?page=${page}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.json();
};

export const deleteAccount = async (id) => {
  await fetch(`${API_URL}/bank-accounts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const payOrder = async (data) => {
  const sendData = {
    address: data.address,
    bankAccount: {
      id: data.accountNumber,
    }
  };
  const res = await fetch(`${API_URL}/users/checkout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendData),
  });
  return res.json();
};

export const getAccount = async (id) => {
  const res = await fetch(`${API_URL}/bank-accounts/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.json();
};

export const updateAccount = async (account) => {
  const res = await fetch(`${API_URL}/bank-accounts`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(account),
  });
  return res.json();
};
