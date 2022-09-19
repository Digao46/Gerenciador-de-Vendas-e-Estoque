import axios from "axios";

const url = "http://localhost:8080";

const apiStorage = axios.create({ baseURL: url });

export async function getProducts() {
  return await apiStorage.get("/storage");
}

export async function getProduct(id: any) {
  return await apiStorage.get(`/storage/${id}`);
}

export async function deleteProduct(id: any) {
  return await apiStorage.delete(`/storage/${id}`);
}

export async function editProduct(id: number, params: any) {
  return await apiStorage.put(`/editProduct/${id}`, {
    ...params,
  });
}

export async function addProduct(params: any) {
  return await apiStorage.post("/newProduct", {
    ...params,
  });
}
