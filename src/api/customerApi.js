import axios from "axios";

export const customerApi = axios.create({
  baseURL: "http://localhost:8083/customer-app/customers",
});

