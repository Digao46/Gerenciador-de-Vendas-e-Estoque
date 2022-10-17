import axios from "axios";

const url = "http://localhost:8080";

// Storage
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

// Sales
const apiSale = axios.create({ baseURL: url });

export async function getSales() {
  return await apiSale.get("/sales");
}

export async function getSale(id: any) {
  return await apiSale.get(`/sales/${id}`);
}

export async function addSale(params: any) {
  return await apiSale.post("/newSale", {
    ...params,
  });
}

// Users
const apiUser = axios.create({ baseURL: url });

export async function getUsers() {
  return await apiUser.get("/users");
}

export async function logIn(params: any) {
  return await apiUser.post("/login", {
    ...params,
  });
}
