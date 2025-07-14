import React, { useState, useEffect } from 'react';
import './BlockList.css';
import { useNavigate } from 'react-router-dom';
import API from '../api'; // Ensure this points to your API setup

const BlockList = ({  }) => {
  const navigate = useNavigate();
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [blocks, setBlocks] = useState([]);

  const handleClickRegister = () => {
    navigate('/block-register');
  };

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const res = await API.get('/api/blocks');
        setBlocks(res.data);
      } catch (err) {
        console.error('Failed to fetch blocks', err);
      }
    };

    fetchBlocks();
  }, []);

  const filteredBlocks = selectedMaterial
    ? blocks.filter(b => b.material === selectedMaterial)
    : blocks;

  return (
    <div className="block-list-page">
      <div className="block-list-header">
        <h1>Block List</h1>
        <button className="new-button" onClick={handleClickRegister}>
          <span>+</span> New
        </button>
      </div>

      <div className="block-list-container">
        <div className="filter-row">
          <select 
            className="material-filter"
            value={selectedMaterial} 
            onChange={(e) => setSelectedMaterial(e.target.value)}
          >
            <option value="">Material</option>
            <option value="Granite">Granite</option>
            <option value="Marble">Marble</option>
            <option value="Quartz">Quartz</option>
            {/* Add real materials if available */}
          </select>
          
          <button 
            className="apply-filter-btn" 
            onClick={() => {}} // optionally refetch
          >
            Apply Filter
          </button>
          <button 
            className="clean-btn" 
            onClick={() => setSelectedMaterial('')}
          >
            To clean
          </button>

          <div className="more-filters-wrapper">
            <button className="more-filters-btn">
              <span className="dropdown-icon">⌄</span> More Filters
            </button>
          </div>
        </div>

        <div className="reports-row">
          <div className="reports-dropdown">
            <button className="reports-btn">
              Reports <span className="dropdown-arrow">▾</span>
            </button>
          </div>
          
          <div className="total-display">
            <span>Total {filteredBlocks.length}</span>
            <button className="settings-icon">⚙</button>
          </div>
        </div>

        <div className="block-list-content">
          {filteredBlocks.length === 0 ? (
            <div className="no-records-message">
              There is no record or no record was found.
            </div>
          ) : (
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
                  {/* <th>Registered</th> */}
                </tr>
              </thead>
              <tbody>
                {filteredBlocks.map((block) => (
                  <tr key={block._id}>
                    <td>{block.block}</td>
                    <td>{block.material}</td>
                    <td>{block.supplier}</td>
                    <td>{block.volume}</td>
                    <td>{block.weight}</td>
                    <td>{block.price}</td>
                    <td>{block.location}</td>
                    {/* <td>{block.registrationDate}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlockList;
