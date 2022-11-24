import axios from "axios";

// const url = "http://localhost:8080";
const url = "https://18.230.88.124:8080";

const apiStorage = axios.create({
  baseURL: url,
});

const apiSale = axios.create({
  baseURL: url,
});

const apiUser = axios.create({
  baseURL: url,
});

const apiSign = axios.create({
  baseURL: url,
});

// ===================== Storage =====================
apiStorage.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("user")!);
    config.headers!.Authorization = `Bearer ${token.token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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

// ===================== Sales =====================
apiSale.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("user")!);
    config.headers!.Authorization = `Bearer ${token.token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function getSales() {
  return await apiSale.get("/sales");
}

export async function addSale(params: any) {
  return await apiSale.post("/newSale", {
    ...params,
  });
}

export async function getSalesForCash() {
  return await apiSale.get("/cash");
}

export async function editProductStorage(id: number, params: any) {
  return await apiStorage.put(`/newSale/${id}`, {
    ...params,
  });
}

//  ===================== Users =====================
apiUser.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("user")!);
    config.headers!.Authorization = `Bearer ${token.token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function getUsers() {
  return await apiUser.get("/users");
}

export async function getUser(id: any) {
  return await apiUser.get(`/users/${id}`);
}

export async function deleteUser(id: any) {
  return await apiUser.delete(`/users/${id}`);
}

export async function addUser(params: any) {
  return await apiUser.post("/newUser", {
    ...params,
  });
}

export async function editUser(id: number, params: any) {
  return await apiUser.put(`/editUser/${id}`, {
    ...params,
  });
}

// ===================== SignIn/SignUp =====================
export async function logIn(params: any) {
  return await apiSign.post("/login", {
    ...params,
  });
}
