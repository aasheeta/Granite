import React, { useState } from 'react';
import './BlockRegister.css';
import { FaCalendarAlt, FaCloudUploadAlt, FaTrashAlt } from 'react-icons/fa';
 import API from '../api'; 

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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlockData({
      ...blockData,
      [name]: value
    });
  };

  const handleSave = async () => {
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
    alert('Block registered successfully!');
    console.log('Response:', res.data);
  } catch (error) {
    console.error('Error saving block:', error);
    alert('Failed to register block.');
  }
};



  // Calculate volume when length, width, or height changes
  React.useEffect(() => {
    if (blockData.length && blockData.width && blockData.height) {
      const volume = (parseFloat(blockData.length) * parseFloat(blockData.width) * parseFloat(blockData.height)).toFixed(3);
      setBlockData({
        ...blockData,
        volume: volume
      });
    }
  }, [blockData.length, blockData.width, blockData.height, blockData]);

  // Handle photo uploads
  const handleMainPhotoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        alert('File size should be less than 10MB');
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
        alert('Some files were skipped because they exceed 10MB size limit');
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
      <div className="register-block-header">
        <h1>Register Block</h1>
        <div className="action-buttons">
          <button className="back-button">To go back</button>
          <button className="save-button" onClick={handleSave}>Save</button>
        </div>
      </div>

      <div className="register-block-content">
        <section className="information-section">
          <h2>Information</h2>
          
          <div className="form-grid">
            {/* <div className="form-group">
              <label htmlFor="registrationDate">Registration Date <span className="required">*</span></label>
              <div className="date-input-wrapper">
                <input
                  type="text"
                  id="registrationDate"
                  name="registrationDate"
                  value={blockData.registrationDate}
                  onChange={handleInputChange}
                  required
                />
                <button className="calendar-button">
                  <FaCalendarAlt />
                </button>
              </div>
            </div> */}

            <div className="form-group">
              <label htmlFor="block">Block <span className="required">*</span></label>
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
              <label htmlFor="supplier">Supplier </label>
              <select
                id="supplier"
                name="supplier"
                value={blockData.supplier}
                onChange={handleInputChange}
                required
              >
                <option value="">(Select Supplier)</option>
                {/* Add supplier options here */}
              </select>
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
              <label htmlFor="purchaseValue">Purchase Value</label>
              <input
                type="number"
                id="purchaseValue"
                name="purchaseValue"
                value={blockData.purchaseValue}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="weight">Weight</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={blockData.weight}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="material">Material <span className="required">*</span></label>
              <select
                id="material"
                name="material"
                value={blockData.material}
                onChange={handleInputChange}
                required
              >
                <option value="">(Select Material)</option>
                {/* Add material options here */}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="code">Code</label>
              <input
                type="text"
                id="code"
                name="code"
                value={blockData.code}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="internship">Internship</label>
              <select
                id="internship"
                name="internship"
                value={blockData.internship}
                onChange={handleInputChange}
              >
                <option value="">(Select Internship)</option>
                {/* Add internship options here */}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="situation">Situation</label>
              <select
                id="situation"
                name="situation"
                value={blockData.situation}
                onChange={handleInputChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                {/* Add other situation options here */}
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

      {/* Email notification warning */}
      {/* <div className="email-warning">
        <p>Your email is not configured correctly!</p> */}
        <p className="warning-action">Click here to configure</p>
        <button className="close-warning">×</button>
      </div>
    // </div>
  );
};

export default RegisterBlock