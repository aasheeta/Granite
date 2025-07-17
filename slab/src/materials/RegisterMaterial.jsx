import React, { useState } from 'react';
import { FiUpload, FiPlus, } from 'react-icons/fi';
import './RegisterMaterial.css';
import API from "../api"

// Register Material Component
const RegisterMaterial = () => {
  const [formData, setFormData] = useState({
    name: '',
    classification: '',
    composition: '',
    color: '',
    scratchResistant: false,
    heatResistant: false,
    waterResistant: false,
    uvResistant: false,
    lowMaintenance: false,
    stainResistant: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
  const { name, composition, classification, color } = formData;
  if (!name) return alert("Name is required!");

  try {
    await API.post('/api/materials', { name, composition, classification, color });
    alert("Material saved successfully!");
  } catch (err) {
    console.error("Failed to save material:", err);
    alert("Error saving material");
  }
};

  return (
    <div className="register-material">
      <div className="header">
        <h2>Register Material</h2>
        <div className="header-buttons">
          <button className="btn btn-secondary">To go back</button>
          <button className="btn btn-primary">
            <FiPlus /> New
          </button>
          <button className="btn btn-success" onClick={handleSave}>Save</button>
        </div>
      </div>

      <div className="content">
        <div className="information-section">
          <h3>Information</h3>
          <div className="form-grid-material">
            <div className="form-left">
              <div className="image-upload">
                <div className="upload-placeholder">
                  <div className="box-icon"></div>
                </div>
                <button className="btn btn-upload">
                  <FiUpload /> Select photo
                </button>
              </div>
            </div>
            
            <div className="form-right">
              <div className="form-row-material">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Composition *</label>
                  <select
                    name="composition"
                    value={formData.composition}
                    onChange={handleInputChange}
                    className="form-control"
                  >
                    <option value="">(Select composition)</option>
                    <option value="granite">Granite</option>
                    <option value="marble">Marble</option>
                    <option value="quartz">Quartz</option>
                  </select>
                </div>
              </div>
              
              <div className="form-row-material">
                <div className="form-group">
                  <label>Classification *</label>
                  <select
                    name="classification"
                    value={formData.classification}
                    onChange={handleInputChange}
                    className="form-control"
                  >
                    <option value="">(Select classification)</option>
                    <option value="basic">Basic</option>
                    <option value="standard">Standard</option>
                    <option value="exotic">Exotic</option>
                    <option value="super-exotic">Super Exotic</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Cor</label>
                  <select
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="form-control"
                  >
                    <option value="">(Select color)</option>
                    <option value="black">Black</option>
                    <option value="white">White</option>
                    <option value="brown">Brown</option>
                  </select>
                </div>
              </div>
              
              <div className="weight-info">
                <div className="weight-item">
                  <span>2cm Average Weight/M² =</span>
                  <small>(Including all bundles with weight and Sq Mt. data of this material)</small>
                </div>
                <div className="weight-item">
                  <span>3cm Media Peso/M² =</span>
                  <small>(Including all bundles with weight and Sq Mt. data of this material)</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="qr-section">
          <h3>QR-CODE information</h3>
          <div className="qr-grid">
            <div className="qr-item">
              <div className="qr-placeholder">
                <div className="box-icon"></div>
              </div>
              <button className="btn btn-upload">
                <FiUpload /> Close-up image
              </button>
            </div>
            <div className="qr-item">
              <div className="qr-placeholder">
                <div className="box-icon"></div>
              </div>
              <button className="btn btn-upload">
                <FiUpload /> Image from Book Match
              </button>
            </div>
            <div className="qr-item">
              <div className="qr-placeholder">
                <div className="box-icon"></div>
              </div>
              <button className="btn btn-upload">
                <FiUpload /> Kitchen Image
              </button>
            </div>
          </div>
          
          <div className="youtube-section">
            <div className="form-group">
              <label>URL YOUTUBE</label>
              <input
                type="text"
                placeholder="Example Link: https://www.youtube.com/embed/xWszGFxnB detail for /embed/"
                className="form-control"
              />
            </div>
          </div>
          
          <div className="properties-grid">
            <div className="properties-left">
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="scratchResistant"
                    checked={formData.scratchResistant}
                    onChange={handleInputChange}
                  />
                  SCRATCH RESISTANT
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="heatResistant"
                    checked={formData.heatResistant}
                    onChange={handleInputChange}
                  />
                  HEAT RESISTANT
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="waterResistant"
                    checked={formData.waterResistant}
                    onChange={handleInputChange}
                  />
                  WATER RESISTANT
                </label>
              </div>
            </div>
            <div className="properties-right">
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="uvResistant"
                    checked={formData.uvResistant}
                    onChange={handleInputChange}
                  />
                  UV RESISTANT
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="lowMaintenance"
                    checked={formData.lowMaintenance}
                    onChange={handleInputChange}
                  />
                  LOW MAINTENANCE
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="stainResistant"
                    checked={formData.stainResistant}
                    onChange={handleInputChange}
                  />
                  STAIN RESISTANT
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterMaterial;