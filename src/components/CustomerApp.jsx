import React, { useState, useEffect } from "react";
import axios from "axios";
import RegisterCustomer from "./RegisterCustomer";
import CustomerList from "./CustomerList";
import UpdateCustomer from "./UpdateCustomer";

export default function CustomerApp() {
  const [customers, setCustomers] = useState([]);
  const [selected, setSelected] = useState(null);

  const BASE_URL = "http://localhost:8083/customer-app/customers";

  const loadCustomers = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
      alert("Error loading customers!");
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const deleteCustomer = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      alert("Deleted!");
      loadCustomers();
    } catch (err) {
      console.error(err);
      alert("Error deleting customer!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Customer Management</h2>

      {/* Register */}
      <RegisterCustomer refresh={loadCustomers} />

      <hr />

      {/* List */}
      <CustomerList
        customers={customers}
        onDelete={deleteCustomer}
        onSelect={(c) => setSelected(c)}
      />

      <hr />

      {/* Update */}
      <UpdateCustomer 
        selected={selected}
        refresh={loadCustomers}
        clear={() => setSelected(null)}
      />
    </div>
  );
}
