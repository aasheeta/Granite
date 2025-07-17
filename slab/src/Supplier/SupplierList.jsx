import React, { useState, useEffect } from 'react';
import { FiPlus, FiSearch, FiEdit2, FiTrash2 } from 'react-icons/fi';
import './SupplierList.css';
import API from '../api';

const SupplierList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await API.get('/api/suppliers');
        setSuppliers(res.data);
      } catch (error) {
        console.error('Failed to fetch suppliers:', error);
      }
    };
    fetchSuppliers();
  }, []);

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.enterprise.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bundle-list-container">
      <div className="bundle-list-header">
        <h2>Supplier List</h2>
        <button className="new-button">
          <FiPlus /> Add Supplier
        </button>
      </div>

      <div className="filter-container">
        <div className="filter-row">
          <div className="filter-item">
            <label htmlFor="search">Search by Company</label>
            <input
              id="search"
              type="text"
              placeholder="Company name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="apply-filter-button">Apply</button>
          <button className="clear-button" onClick={() => setSearchTerm('')}>Clear</button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="bundle-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>CNPJ</th>
              <th>Telephone</th>
              <th>Note</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.map((supplier) => (
              <tr key={supplier._id}>
                <td>{supplier.enterprise}</td>
                <td>{supplier.cnpj}</td>
                <td>{supplier.telephone}</td>
                <td>{supplier.note}</td>
                <td>
                  <div className="action-buttons">
                                                         <button className="btn-icon">
                                                           <FiEdit2 />
                                                         </button>
                                                         <button className="btn-icon">
                                                           <FiTrash2 />
                                                         </button>
                                                       </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Responsive Card View */}
        {/* <div className="bundle-card-grid">
          {filteredSuppliers.map((supplier) => (
            <div key={supplier._id} className="bundle-card">
              <h3>{supplier.enterprise}</h3>
              <p><strong>CNPJ:</strong> {supplier.cnpj}</p>
              <p><strong>Phone:</strong> {supplier.telephone}</p>
              <p><strong>Note:</strong> {supplier.note}</p>
              <div className="action-buttons">
                <button className="action-btn edit-btn"><FiEdit2 /></button>
                <button className="action-btn delete-btn"><FiTrash2 /></button>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default SupplierList;
