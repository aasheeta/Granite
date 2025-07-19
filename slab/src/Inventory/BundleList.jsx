import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmModal from '../components/DeleteModal';
import {  FiEdit2, FiTrash2 } from 'react-icons/fi';
import API from '../api';
import './BundleList.css';
import FeedbackMessage from '../components/FeedbackMessage';    

const BundleList = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const [blockValue, setBlockValue] = useState('');
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [bundleValue, setBundleValue] = useState('');
  const [bundles, setBundles] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [filter, setFilter] = useState({ material: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [bundleToDelete, setBundleToDelete] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {
    API.get('/api/materials')
      .then(res => setMaterials(res.data))
      .catch(err => console.error("Failed to load materials", err));

    API.get('/api/bundles', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setBundles(res.data))
      .catch(() => logout());
  }, [token, logout]);

  const handleApplyFilter = () => {
    // You can extend this to call an API with filters
    console.log('Filter applied:', { filter, blockValue, bundleValue });
  };

  const handleClear = () => {
    setFilter({ material: '' });
    setBlockValue('');
    setBundleValue('');
  };

  const handleClickRegister = () => {
    navigate('/bundle-register');
  };

  return (
    <div className="bundle-list-container">
      {feedback.message && (
  <FeedbackMessage type={feedback.type} message={feedback.message} />
)}
      {/* Header */}
      <div className="bundle-list-header">
        <h2>Bundle List</h2>
        <button onClick={handleClickRegister} className="new-button">
          <span>+</span> Add Bundle
        </button>
      </div>

      {/* Filters */}
      <div className="filter-container">
        <div className="filter-row">
          <div className="filter-item">
            <label>Material</label>
            <select
              value={filter.material}
              onChange={(e) => setFilter({ ...filter, material: e.target.value })}
            >
              <option value="">(Select Material)</option>
              {materials.map((mat) => (
                <option key={mat._id} value={mat.name}>{mat.name}</option>
              ))}
            </select>
          </div>

<div className="filter-item">
            <label>Block</label>
            <select
              value={filter.block}
              onChange={(e) => setFilter({ ...filter, block: e.target.value })}
            >
{/* PLease make sure the block lists down in the dropdown thanks */}
              <option value="">(Select Block)</option>
              {materials.map((mat) => (
                <option key={mat._id} value={mat.name}>{mat.name}</option>
              ))}
            </select>
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

          <button className="apply-filter-button" onClick={handleApplyFilter}>Apply Filter</button>
          <button className="clear-button" onClick={handleClear}>Clear Filter</button>
          {/* <button className="more-filters-button"><span>≡</span> More Filters</button> */}
        </div>
      </div>

      {/* Reports and Highlights */}
      {/* <div className="reports-section">
        <div className="reports-dropdown">
          <button className="reports-button">Reports <span className="caret">▼</span></button>
        </div>

        <div className="highlights">
          <span className="highlight-label">Highlights:</span>
          <div className="highlight-tags">
            <div className="highlight-tag"><Monitor size={16} /> TV Home</div>
            <div className="highlight-tag recommended"><span className="star">★</span> Recommended</div>
            <div className="highlight-tag offer"><Tag size={16} /> Offer</div>
            <div className="highlight-tag new-arrivals"><Box size={16} /> New Arrivals</div>
            <div className="highlight-tag photo"><Camera size={16} /> Photo</div>
            <div className="highlight-tag pre-booking"><Calendar size={16} /> Pre-Booking</div>
          </div>
        </div>

        <div className="total-section">
          <div className="total-display">Total {bundles.length}</div>
          <button className="settings-button">⚙</button>
        </div>
      </div> */}

      {/* Records Table or Cards */}
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
                <strong>Plates:</strong> {bundle.plates.length}<br />
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
                  <th>Slabs</th>
                  <th>Quality</th>
                  <th>Thickness</th>
                  <th>Finish</th>
                  <th>Sq. Ft.</th>
                  <th>Status</th>
                   <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bundles.map((bundle) => (
                  <tr key={bundle._id}>
                    <td>{bundle.material}</td>
                    <td>{bundle.block}</td>
                    <td>{bundle.bundle}</td>
                    <td>{bundle.plates.length}</td>
                    <td>{bundle.quality}</td>
                    <td>{bundle.thickness}</td>
                    <td>{bundle.finish}</td>
                    <td></td>
                    <td>
                      <span className={`status-tag ${bundle.status}`}>
                        {bundle.status}
                      </span>
                    </td>
                    <td>
                                      <div className="action-buttons">
                        <button className="btn-icon" onClick={() => navigate('/bundle-register', { state: { bundle } })}>
                          <FiEdit2 />
                        </button>
                                        <button className="btn-icon"
                          onClick={() => {
                            setBundleToDelete(bundle);
                            setShowDeleteModal(true);
                          }}
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
        )}
        <DeleteConfirmModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setBundleToDelete(null);
          }}
          onConfirm={async () => {
            try {
              await API.delete(`/api/bundles/${bundleToDelete._id}`, {
                headers: { Authorization: `Bearer ${token}` }
              });
              setBundles(prev => prev.filter(b => b._id !== bundleToDelete._id));
               setFeedback({ message: 'Bundle deleted successfully!', type: 'success' });
              setShowDeleteModal(false);
              setBundleToDelete(null);
              setTimeout(() => setFeedback({ message: '', type: '' }), 3000);
            } catch (err) {
              console.error("Delete failed", err);
              setFeedback({ message: 'Failed to delete bundle.', type: 'error' });
            }
          }}
          bundle={bundleToDelete}
        />

      </div>
    </div>
    
  );
};

export default BundleList;
