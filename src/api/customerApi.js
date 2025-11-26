import axios from "axios";

export const customerApi = axios.create({
  baseURL: "http://localhost:8083/customer-app/customers",
});


export const loginCustomer = (data) => customerApi.post("/login", data);
export const registerCustomer = (data) => customerApi.post("/register", data);
export const getCustomerById = (id) => customerApi.get(`/${id}`);
export const searchCustomerByName = (name) => customerApi.get("/search", { params: { name } });
