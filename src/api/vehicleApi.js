import axios from "axios";

export const vehicleApi = axios.create({
  baseURL: "http://localhost:8082/vehicle-service/vehicles",
});