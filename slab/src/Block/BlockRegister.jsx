import React, { useState, useEffect } from 'react';
import './BlockRegister.css';
import { FaCloudUploadAlt, FaTrashAlt } from 'react-icons/fa';
import API from '../api'; 
import FeedbackMessage from '../components/FeedbackMessage';

const RegisterBlock = () => {
  const [blockData, setBlockData] = useState({
    registrationDate: '16/05/2025',
    block: '',
    length: '',
    height: '',
    width: '',
    volume: '',
    supplier: '',
    location: '',
    price: '',
    purchaseValue: '',
    weight: '',
    material: '',
    code: '',
    internship: '',
    situation: 'Active',
    description: '',
  });

  const [photos, setPhotos] = useState({
    main: null,
    secondary: []
  });

  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [materials, setMaterials] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [showAddMaterialModal, setShowAddMaterialModal] = useState(false);
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
  const [newMaterialName, setNewMaterialName] = useState('');
  const [newSupplierName, setNewSupplierName] = useState('');

  // Fetch materials on component mount
  useEffect(() => {
    API.get('/api/materials')
      .then(res => setMaterials(res.data))
      .catch(err => console.error("Failed to load materials", err));
  }, []);

  // Fetch suppliers on component mount
  useEffect(() => {
    API.get('/api/suppliers')
      .then(res => setSuppliers(res.data))
      .catch(err => console.error("Failed to load suppliers", err));
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlockData({
      ...blockData,
      [name]: value
    });
  };

  // Handle material dropdown change
  const handleMaterialChange = (e) => {
    if (e.target.value === 'add_new') {
      setShowAddMaterialModal(true);
    } else {
      setBlockData({ ...blockData, material: e.target.value });
    }
  };

  // Handle supplier dropdown change
  const handleSupplierChange = (e) => {
    if (e.target.value === 'add_new') {
      setShowAddSupplierModal(true);
    } else {
      setBlockData({ ...blockData, supplier: e.target.value });
    }
  };

  // Add new material
  const handleAddNewMaterial = async () => {
    if (!newMaterialName.trim()) return;

    try {
      const res = await API.post('/api/materials', { name: newMaterialName });
      setMaterials(prev => [...prev, res.data]);
      setBlockData({ ...blockData, material: res.data.name });
      setNewMaterialName('');
      setShowAddMaterialModal(false);
      setFeedback({ type: 'success', message: 'Material added successfully!' });
    } catch (err) {
      console.error("Failed to add material", err);
      setFeedback({ type: 'error', message: 'Failed to add material' });
    }
  };

  // Add new supplier
  const handleAddNewSupplier = async () => {
    if (!newSupplierName.trim()) return;

    try {
      const res = await API.post('/api/suppliers', { name: newSupplierName });
      setSuppliers(prev => [...prev, res.data]);
      setBlockData({ ...blockData, supplier: res.data.enterprise });
      setNewSupplierName('');
      setShowAddSupplierModal(false);
      setFeedback({ type: 'success', message: 'Supplier added successfully!' });
    } catch (err) {
      console.error("Failed to add supplier", err);
      setFeedback({ type: 'error', message: 'Failed to add supplier' });
    }
  };

  const handleSave = async () => {
    // Validation - check required fields
    const errors = [];
    
    if (!blockData.block.trim() || !blockData.supplier.trim() || !blockData.material.trim()) errors.push("Please fill required details.");
    
    
    if (errors.length > 0) {
      setFeedback({ type: 'error', message: errors.join(' ') });
      return;
    }

    // Clear previous feedback
    setFeedback({ type: '', message: '' });

    try {
      const payload = {
        ...blockData,
        // optionally: sanitize numeric fields
        length: parseFloat(blockData.length) || 0,
        width: parseFloat(blockData.width) || 0,
        height: parseFloat(blockData.height) || 0,
        volume: parseFloat(blockData.volume) || 0,
        price: parseFloat(blockData.price) || 0,
        purchaseValue: parseFloat(blockData.purchaseValue) || 0,
        weight: parseFloat(blockData.weight) || 0,
      };

      const res = await API.post('/api/blocks', payload);
      setFeedback({ type: 'success', message: 'Block registered successfully!' });
      console.log('Response:', res.data);
      
      // Reset form after successful save
      setBlockData({
        registrationDate: '16/05/2025',
        block: '',
        length: '',
        height: '',
        width: '',
        volume: '',
        supplier: '',
        location: '',
        price: '',
        purchaseValue: '',
        weight: '',
        material: '',
        code: '',
        internship: '',
        situation: 'Active',
        description: '',
      });
    } catch (error) {
      console.error('Error saving block:', error);
      setFeedback({ type: 'error', message: 'Failed to register block.' });
    }
  };

  // Calculate volume when length, width, or height changes
  React.useEffect(() => {
    if (blockData.length && blockData.width && blockData.height) {
      const volume = (parseFloat(blockData.length) * parseFloat(blockData.width) * parseFloat(blockData.height)).toFixed(3);
      setBlockData(prevData => ({
        ...prevData,
        volume: volume
      }));
    }
  }, [blockData.length, blockData.width, blockData.height]);

  // Clear feedback after 3 seconds
  useEffect(() => {
    if (feedback.message) {
      const timer = setTimeout(() => {
        setFeedback({ type: '', message: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  // Handle photo uploads
  const handleMainPhotoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setFeedback({ type: 'error', message: 'File size should be less than 10MB' });
        return;
      }
      setPhotos({
        ...photos,
        main: file
      });
    }
  };

  const handleSecondaryPhotosUpload = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const validFiles = filesArray.filter(file => file.size <= 10 * 1024 * 1024);
      
      if (validFiles.length !== filesArray.length) {
        setFeedback({ type: 'error', message: 'Some files were skipped because they exceed 10MB size limit' });
      }

      setPhotos({
        ...photos,
        secondary: [...photos.secondary, ...validFiles]
      });
    }
  };

  const handleDeleteAllPhotos = () => {
    setPhotos({
      main: null,
      secondary: []
    });
  };

  return (
    <div className="register-block-container">
      <FeedbackMessage type={feedback.type} message={feedback.message} />
      
      <div className="register-block-header">
        <h1>Register Block</h1>
        <div className="action-buttons">
          <button className="save-button" onClick={handleSave}>Save</button>
        </div>
      </div>

      <div className="register-block-content">
        <section className="information-section">
          <h2>Information</h2>
          
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="block">Block Name <span className="required">*</span></label>
              <input
                type="text"
                id="block"
                name="block"
                value={blockData.block}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="supplier">Supplier <span className="required">*</span></label>
              <select
                id="supplier"
                name="supplier"
                value={blockData.supplier}
                onChange={handleSupplierChange}
                required
              >
                <option value="">(Select Supplier)</option>
                {suppliers.map(supplier => (
                  <option key={supplier._id} value={supplier.enterprise}>{supplier.enterprise}</option>
                ))}
                <option value="add_new">➕ Add New Supplier</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="material">Material <span className="required">*</span></label>
              <select
                id="material"
                name="material"
                value={blockData.material}
                onChange={handleMaterialChange}
                required
              >
                <option value="">(Select Material)</option>
                {materials.map(material => (
                  <option key={material._id} value={material.name}>{material.name}</option>
                ))}
                <option value="add_new">➕ Add New Material</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="length">Length (M)</label>
              <input
                type="number"
                id="length"
                name="length"
                value={blockData.length}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="height">Height (M)</label>
              <input
                type="number"
                id="height"
                name="height"
                value={blockData.height}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="width">Width (M)</label>
              <input
                type="number"
                id="width"
                name="width"
                value={blockData.width}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="volume">Volume (M³)</label>
              <input
                type="text"
                id="volume"
                name="volume"
                value={blockData.volume}
                readOnly
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={blockData.location}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price (M³)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={blockData.price}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="purchaseValue">Purchase Cost</label>
              <input
                type="number"
                id="purchaseValue"
                name="purchaseValue"
                value={blockData.purchaseValue}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="weight">Weight (Ton)</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={blockData.weight}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="internship">Status</label>
              <select
                id="internship"
                name="internship"
                value={blockData.internship}
                onChange={handleInputChange}
              >
                <option value="">(Select Status)</option>
                <option value="Transfer">Transfer</option>
                <option value="Gantry">Gantry</option>
                <option value="Production">Production</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={blockData.description}
              onChange={handleInputChange}
              rows={5}
            />
          </div>
        </section>

        <section className="photos-section">
          <div className="photos-header">
            <h2>Block Photos</h2>
            <button className="photos-zip-button">
              <FaCloudUploadAlt /> Photos.zip
            </button>
          </div>

          <div className="photo-upload-buttons">
            <label className="upload-button main-photo-button">
              <FaCloudUploadAlt /> Main Photo
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleMainPhotoUpload} 
                hidden 
              />
            </label>

            <label className="upload-button secondary-photos-button">
              <FaCloudUploadAlt /> Secondary Photos
              <input 
                type="file" 
                accept="image/*" 
                multiple 
                onChange={handleSecondaryPhotosUpload} 
                hidden 
              />
            </label>
          </div>

          <div className="photo-action-buttons">
            <button className="delete-all-button" onClick={handleDeleteAllPhotos}>
              <FaTrashAlt /> All
            </button>
            <button className="save-photos-button" onClick={handleSave}>
              <FaCloudUploadAlt /> Save
            </button>
          </div>

          <p className="photo-size-note">Please only select photos smaller than 10MB.</p>
        </section>
      </div>

      {/* Material Modal */}
      {showAddMaterialModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Add New Material</h3>
            <input
              type="text"
              value={newMaterialName}
              onChange={(e) => setNewMaterialName(e.target.value)}
              placeholder="Enter material name"
            />
            <div className="modal-actions">
              <button onClick={handleAddNewMaterial}>Save</button>
              <button onClick={() => setShowAddMaterialModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Supplier Modal */}
      {showAddSupplierModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Add New Supplier</h3>
            <input
              type="text"
              value={newSupplierName}
              onChange={(e) => setNewSupplierName(e.target.value)}
              placeholder="Enter supplier name"
            />
            <div className="modal-actions">
              <button onClick={handleAddNewSupplier}>Save</button>
              <button onClick={() => setShowAddSupplierModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterBlock;