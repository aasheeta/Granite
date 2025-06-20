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
        const res = await API.get('/api/suppliers'); // Adjust endpoint if needed
        setSuppliers(res.data);
      } catch (error) {
        console.error('Failed to fetch suppliers:', error);
      }
    };

    fetchSuppliers();
  }, []);
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    console.log("abc", setSuppliers(""))
  };

  const handleApplyFilter = () => {
    console.log('Applying filter for:', searchTerm);
  };

  const handleClearFilter = () => {
    setSearchTerm('');
    console.log('Clearing filters');
  };

  const handleNewSupplier = () => {
    console.log('Adding new supplier');
  };

  const handleEditSupplier = (id) => {
    console.log('Editing supplier:', id);
  };

  const handleDeleteSupplier = (id) => {
    console.log('Deleting supplier:', id);
  };

 const filteredSuppliers = suppliers.filter(supplier =>
  supplier.enterprise.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className="supplier-list-container">
      <div className="header">
        <div className="header-left">
          <h1 className="page-title">Supplier List</h1>
        </div>
        <div className="header-right">
          <button className="btn-primary" onClick={handleNewSupplier}>
            <FiPlus className="btn-icon" />
            New
          </button>
        </div>
      </div>

      <div className="content">
        <div className="filter-section">
          <div className="search-container">
            <div className="search-input-wrapper">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Name"
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
            </div>
            <button className="btn-filter" onClick={handleApplyFilter}>
              Apply Filter
            </button>
            <button className="btn-clear" onClick={handleClearFilter}>
              To clean
            </button>
          </div>
        </div>

        <div className="table-section">
          <div className="table-container">
            <table className="suppliers-table">
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>CNPJ</th>
                  <th>Telephone</th>
                  <th>Note:</th>
                  <th>Options</th>
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
                        <button
                          className="action-btn edit-btn"
                          onClick={() => handleEditSupplier(supplier._id)}
                          title="Edit"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => handleDeleteSupplier(supplier._id)}
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierList;