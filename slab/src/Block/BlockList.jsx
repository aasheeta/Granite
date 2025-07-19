import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import './BlockList.css';

const BlockList = () => {
  const navigate = useNavigate();
  const [blocks, setBlocks] = useState([]);
  const [materialFilter, setMaterialFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const res = await API.get('/api/blocks');
        setBlocks(res.data);
      } catch (err) {
        console.error('Error fetching blocks:', err);
      }
    };

    fetchBlocks();
  }, []);

  const filteredBlocks = blocks.filter(block =>
    block.material.toLowerCase().includes(materialFilter.toLowerCase()) &&
    block.block.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="block-list-container">
      <div className="block-list-header">
        <h2>Block List</h2>
        <button className="new-button" onClick={() => navigate('/block-register')}>
          + Add Block
        </button>
      </div>

      <div className="filter-container">
        <div className="filter-row">
          <div className="filter-item">
            <label>Search by Block</label>
            <input
              type="text"
              placeholder="e.g. BL-123"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-item">
            <label>Material</label>
            <select
              value={materialFilter}
              onChange={e => setMaterialFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="Granite">Granite</option>
              <option value="Marble">Marble</option>
              <option value="Quartz">Quartz</option>
            </select>
          </div>

          <button
            className="apply-filter-button"
            onClick={() => {}}
          >
            Apply Filter
          </button>

          <button
            className="clear-button"
            onClick={() => {
              setSearchTerm('');
              setMaterialFilter('');
            }}
          >
            Clear
          </button>

          {/* <button className="more-filters-button">
            More Filters
          </button> */}
        </div>
      </div>

      {/* <div className="reports-section">
        <button className="reports-button">Reports ▾</button>
        <span>Total: {filteredBlocks.length}</span>
      </div> */}

      <table className="block-table">
        <thead>
          <tr>
            <th>Block</th>
            <th>Material</th>
            <th>Supplier</th>
            <th>Volume (m³)</th>
            <th>Weight</th>
            <th>Price</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {filteredBlocks.map(block => (
            <tr key={block._id}>
              <td>{block.block}</td>
              <td>{block.material}</td>
              <td>{block.supplier}</td>
              <td>{block.volume}</td>
              <td>{block.weight}</td>
              <td>{block.price}</td>
              <td>{block.location}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <div className="block-card-grid">
        {filteredBlocks.map(block => (
          <div className="block-card" key={block._id}>
            <h3>{block.block}</h3>
            <p><strong>Material:</strong> {block.material}</p>
            <p><strong>Supplier:</strong> {block.supplier}</p>
            <p><strong>Volume:</strong> {block.volume} m³</p>
            <p><strong>Weight:</strong> {block.weight}</p>
            <p><strong>Price:</strong> {block.price}</p>
            <p><strong>Location:</strong> {block.location}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default BlockList;
