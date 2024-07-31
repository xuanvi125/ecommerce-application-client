import { API_URL } from "../utils/config";

export const getCart = async () => {
  const res = await fetch(`${API_URL}/users/carts`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.json();
};

export const addToCart = async (bookId) => {
  const res = await fetch(`${API_URL}/users/carts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product: {id: bookId}, quantity: 1 }),
  });
  return res.json();
};

export const removeFromCart = async (cartDetailsId) => {
  const res = await fetch(`${API_URL}/users/carts/${cartDetailsId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res;
};

export const updateCart = async (cartDetailsId, quantity) => {
  const res = await fetch(`${API_URL}/users/carts`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id:cartDetailsId ,quantity }),
  });

  return res.json();
};

export const emptyCart = async () => {
  const res = await fetch(`${API_URL}/users/carts`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const checkout = async (data) => {
  console.log(data);
  const res = await fetch(`${API_URL}/users/checkout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      address: data.address,
      bankAccount: {
        id: data.bankNumber,
      }
    }),
  });
  return res.json();
};
