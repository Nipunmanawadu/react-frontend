import React from "react";
import VehicleList from "../components/VehicleList";
import SearchVehicle from "../components/SearchVehicle";

function CustomerDashboard() {
  return (
    <div>
      <h1>Customer Dashboard</h1>

      <SearchVehicle />

      <VehicleList isAdmin={false} />
    </div>
  );
}

export default CustomerDashboard;
