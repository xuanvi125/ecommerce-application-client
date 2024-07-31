import { API_URL } from "../utils/config";

export async function getLowerStock() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/public/books?limit=4&filter=inventory < 100`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function getBooksByCategory(
  category = "all",
  page = 1,
  limit = 8
) {
  const token = localStorage.getItem("token");
  category = category || "all";
  if (category === "all") {
    const response = await fetch(
      `${API_URL}/public/books?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  }
  const response = await fetch(
    `${API_URL}/public/books?page=${page}&limit=${limit}&filter=category.id:${category}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
}

export async function searchBook(query) {

  query.set("filter", `name ~ \'${query.get("keyword")}\'`);
  query.delete("keyword");
  const page = query.get("page") || 1;
  query.delete("page");

  const minPrice = query.get("min_price");
  const maxPrice = query.get("max_price");
  if(minPrice){
    query.set("filter", query.get("filter") + `AND price >= ${minPrice}`);
  }
  if(maxPrice){
    query.set("filter", query.get("filter") + `AND price <= ${maxPrice}`);
  }


  const category = query.get("category");
  if(category !== "all" && category !== null) {
      query.set("filter", query.get("filter") + `AND category.id:${category}`);
  }
  query.delete("category");

  const token = localStorage.getItem("token");
  console.log(query.toString());
  const fetchUrl =`${API_URL}/public/books?limit=8&page=${page}&${query.toString()}`;
  console.log("fetchUrl", fetchUrl);
  const response = await fetch(fetchUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
}
export async function getProduct(id) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/public/books/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function getReviews(id) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/public/reviews?filter=book.id:${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function createReview(data) {
  const dataSend = { content: data.review, rating: data.rating, user:{id: data.userId}, book:{id: data.bookId} };
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/users/reviews`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataSend),
  });
  const res = await response.json();
  console.log(res);
  return res;
}

export async function deleteReview(id) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/users/reviews/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getProducts(page = 1) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/public/books?page=${page}&limit=8`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function addProduct(product) {
  const token = localStorage.getItem("token");
  console.log(product);
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("author", product.author);
  formData.append("description", product.description);
  formData.append("price", product.price);
  formData.append("publisher", product.publisher);
  formData.append("publishYear", product.publishedYear);

  if (product.image) formData.append("file", product.image);
  formData.append("category", product.categoryID);
  formData.append("inventory", product.inventory);

  const response = await fetch(`${API_URL}/admin/books`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return response.json();
}

export async function updateProduct(product) {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("id", product.id);
  formData.append("name", product.name);
  formData.append("author", product.author);
  formData.append("description", product.description);
  formData.append("price", product.price);
  formData.append("publisher", product.publisher);
  formData.append("publishYear", product.publishedYear);

  if (product.image) formData.append("file", product.image);
  formData.append("category", product.categoryID);
  formData.append("inventory", product.inventory);

  const response = await fetch(`${API_URL}/admin/books`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  return response.json();
}

export async function deleteProduct(id) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/admin/books/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}
