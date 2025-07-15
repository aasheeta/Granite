import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './BundleList.css';
import { Tag, Monitor, Box, Camera, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const BundleList = () => {
    const { token, logout } = useAuth();
  const navigate = useNavigate();
  // const [materialValue, setMaterialValue] = useState('');
  const [blockValue, setBlockValue] = useState('');
  const [bundleValue, setBundleValue] = useState('');
  const [bundles, setBundles] = useState([]); // ← State to store fetched bundles
  const [materials, setMaterials] = useState([]);
  const [bundleData, setBundleData] = useState({
    material: '',
    // ... other fields
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

//   useEffect(() => {
//     fetchBundles();
//   }, []);

//   const fetchBundles = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/bundles');
//       setBundles(res.data);
//     } catch (error) {
//       console.error('Failed to fetch bundles:', error);
//     }
//   };


  useEffect(() => {
    // Fetch materials from backend
    API.get('/api/materials')
      .then(res => setMaterials(res.data))
      .catch(err => console.error("Failed to load materials", err));
  }, []);

  useEffect(() => {
    API
      .get('/api/bundles', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setBundles(res.data))
      .catch(() => logout());
  }, [token,logout]);

  const handleApplyFilter = () => {
    // You can later add filter logic here
    console.log('Applying filters...');
  };

  const handleClear = () => {
    // setMaterialValue('');
    setBlockValue('');
    setBundleValue('');
  };

  const handleClickRegister = () => {
    navigate('/bundle-register');
  };

  
  return (
    <div className="bundle-list-container">
      <div className="bundle-list-header">
        <h2>Bundle List</h2>
        <button onClick={handleClickRegister} className="new-button">
          <span>+</span> New
        </button>
      </div>
      
      <div className="filter-container">
        <div className="filter-row">
          <div className="filter-item">
            <label>Material</label>
            <select
              name="material"
              value={bundleData.material}
              onChange={(e) =>
                setBundleData({ ...bundleData, material: e.target.value })
              }
            >
              <option value="">(Select Material)</option>
              {materials.map((mat) => (
                <option key={mat._id} value={mat.name}>
                  {mat.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-item">
            <label>Block</label>
            <input 
              type="text" 
              placeholder="(Example: 332145564345)" 
              value={blockValue} 
              onChange={(e) => setBlockValue(e.target.value)}
            />
          </div>
          
          <div className="filter-item">
            <label>Bundle</label>
            <input 
              type="text" 
              placeholder="(Example: 332145564345)" 
              value={bundleValue} 
              onChange={(e) => setBundleValue(e.target.value)}
            />
          </div>
          
          <button className="apply-filter-button" onClick={handleApplyFilter}>
            Apply Filter
          </button>
          
          <button className="clear-button" onClick={handleClear}>
            To clean
          </button>
          
          <button className="more-filters-button">
            <span>≡</span> More Filters
          </button>
        </div>
      </div>
      
      <div className="reports-section">
        <div className="reports-dropdown">
          <button className="reports-button">
            Reports <span className="caret">▼</span>
          </button>
        </div>
        
        <div className="highlights">
          <span className="highlight-label">Highlights:</span>
          <div className="highlight-tags">
            <div className="highlight-tag">
              <Monitor size={16} /> TV Home
            </div>
            <div className="highlight-tag recommended">
              <span className="star">★</span> Recommended
            </div>
            <div className="highlight-tag offer">
              <Tag size={16} /> Offer
            </div>
            <div className="highlight-tag new-arrivals">
              <Box size={16} /> New Arrivals
            </div>
            <div className="highlight-tag photo">
              <Camera size={16} /> Photo
            </div>
            <div className="highlight-tag pre-booking">
              <Calendar size={16} /> Pre-Booking
            </div>
          </div>
        </div>
        
        <div className="total-section">
          <div className="total-display">
            Total 0
          </div>
          <button className="settings-button">
            <span className="gear">⚙</span>
          </button>
        </div>
      </div>
      
       <div className="records-container">
      {bundles.length === 0 ? (
        <div className="no-records-message">
          <p>No records found</p>
        </div>
      ) : isMobile ? (
        <div className="bundle-card-grid">
          {bundles.map((bundle) => (
            <div className="bundle-card" key={bundle._id}>
              <strong>Material:</strong> {bundle.material}<br />
              <strong>Block:</strong> {bundle.block}<br />
              <strong>Bundle:</strong> {bundle.bundle}<br />
              <strong>Quality:</strong> {bundle.quality}<br />
              <strong>Thickness:</strong> {bundle.thickness}<br />
              <strong>Finish:</strong> {bundle.finish}
            </div>
          ))}
        </div>
      ) : (
        <div className="table-responsive">
          <table className="bundle-table">
            <thead>
              <tr>
                <th>Material</th>
                <th>Block</th>
                <th>Bundle</th>
                <th>Quality</th>
                <th>Thickness</th>
                <th>Finish</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bundles.map((bundle) => (
                <tr key={bundle._id}>
                  <td>{bundle.material}</td>
                  <td>{bundle.block}</td>
                  <td>{bundle.bundle}</td>
                  <td>{bundle.quality}</td>
                  <td>{bundle.thickness}</td>
                  <td>{bundle.finish}</td>
                  <td>
                    <span
                      className={`status-tag ${bundle.status}`}
                    >
                      {bundle.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
</div>
    </div>
  );
};

export default BundleList;