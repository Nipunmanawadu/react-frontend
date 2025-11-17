import axios from "axios";

// Vehicle microservice
export const vehicleApi = axios.create({
  baseURL: "http://localhost:8082/vehicle-service",
});

// Customer microservice
export const customerApi = axios.create({
  baseURL: "http://localhost:8083/customer-app/customers",
});
