import React from "react";
import "./CustomerList.css";

export default function CustomerList({ customers, onDelete, onSelect }) {
  return (
    <div>
      <h3>Customer List</h3>
      <table className="customerTable">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>
                <button onClick={() => onSelect(c)} className="customerBtn updateBtn">Update</button>
                <button onClick={() => onDelete(c.id)} className="customerBtn deleteBtn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
