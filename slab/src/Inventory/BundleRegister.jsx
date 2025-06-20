import React, { useState, useEffect } from 'react';
import './BundleRegister.css';
import Select from 'react-select';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from "../api"

const BundleRegister = () => {
     const { token } = useAuth();
     const navigate = useNavigate();
    const [quality, setQuality] = useState(null);
    const [thickness, setThickness] = useState(null);
    const [finish, setFinish] = useState(null);
    const [block, setBlock] = useState('');
    const [bundle, setBundle] = useState('');
    const [isSelf, setIsSelf] = useState(false);
    const [priceSqMt, setPriceSqMt] = useState('');
    const [priceSqFt, setPriceSqFt] = useState('');
    const [oldPriceSqMt, setOldPriceSqMt] = useState('');
    const [oldPriceSqFt, setOldPriceSqFt] = useState('');
    const [tags, setTags] = useState([]);
    const [availability, setAvailability] = useState('available');

    const [materials, setMaterials] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
   const [showAddMaterialModal, setShowAddMaterialModal] = useState(false);
    const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
   const [newMaterialName, setNewMaterialName] = useState('');
    const [newSupplierName, setNewSupplierName] = useState('');
  const [bundleData, setBundleData] = useState({
    material: materials,
    supplier: suppliers,
    // ... other fields
  });

  useEffect(() => {
    // Fetch materials from backend
    API.get('/api/materials')
      .then(res => setMaterials(res.data))
      .catch(err => console.error("Failed to load materials", err));
  }, []);

  useEffect(() => {
    // Fetch materials from backend
    API.get('/api/suppliers')
      .then(res => setSuppliers(res.data))
      .catch(err => console.error("Failed to load materials", err));
  }, []);

    const qualityOptions = [
        { value: 'premium', label: 'Premium' },
        { value: 'standard', label: 'Standard' },
        { value: 'economy', label: 'Economy' },
    ];

    const thicknessOptions = [
        { value: '20mm', label: '20mm' },
        { value: '30mm', label: '30mm' },
        { value: '40mm', label: '40mm' },
    ];

    const finishOptions = [
        { value: 'polished', label: 'Polished' },
        { value: 'honed', label: 'Honed' },
        { value: 'leathered', label: 'Leathered' },
    ];

    const tagOptions = [
        { value: 'new', label: 'New' },
        { value: 'featured', label: 'Featured' },
        { value: 'discount', label: 'Discount' },
    ];

    const handleSave = async () => {
        const bundleData = {
            supplier: suppliers.value,
            material: materials?.value,
            quality: quality?.value,
            thickness: thickness?.value,
            finish: finish?.value,
            block,
            bundle,
            isSelf,
            priceSqMt,
            priceSqFt,
            oldPriceSqMt,
            oldPriceSqFt,
            tags: tags.map(t => t.value),
            availability,
        };

        try {
            // const res = await fetch('http://localhost:5000/api/bundles', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(bundleData)
            // });
            const res  = await API.post('/api/bundles', bundleData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(res)
            navigate('/');

                alert('Bundle registered successfully!');
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddNewMaterial = async () => {
        if (!newMaterialName.trim()) return;

        try {
            const res = await API.post('/api/materials', { name: newMaterialName });
            setMaterials(prev => [...prev, res.data]); // Update dropdown list
            setBundleData({ ...bundleData, material: res.data.name }); // Set selected
            setNewMaterialName('');
            setShowAddMaterialModal(false);
        } catch (err) {
            console.error("Failed to add material", err);
            alert("Failed to add material");
        }
    };

    const handleAddNewSupplier = async () => {
        if (!newSupplierName.trim()) return;

        try {
            const res = await API.post('/api/suppliers', { name: newSupplierName });
            setSuppliers(prev => [...prev, res.data]); // Update dropdown list
            setBundleData({ ...bundleData, material: res.data.name }); // Set selected
            setNewSupplierName('');
            setShowAddSupplierModal(false);
        } catch (err) {
            console.error("Failed to add material", err);
            alert("Failed to add material");
        }
    };

    return (
        
        <div className="register-container">
            <div className="register-header">
                <h1>Register Bundle</h1>
                <div className="button-group">
                    <button className="btn-back">To go back</button>
                    <button className="btn-save" onClick={handleSave}>Save</button>
                </div>
            </div>

            <div className="register-content">
                <div className="left-panel">
                    <div className="section-header">
                        <h2>Information</h2>
                        <button className="btn-advanced">Advanced ▾</button>
                    </div>

                    <div className="form-group">
                        <label htmlFor="supplier">
                            Supplier <span className="required">*</span>
                        </label>
                         <select
                            name="supplier"
                            value={bundleData.supplier}
                            onChange={(e) => {
                                if (e.target.value === 'add_new') {
                                    setShowAddSupplierModal(true);
                                } else {
                                    setBundleData({ ...bundleData, supplier: e.target.value });
                                }
                            }}
                        >
                            <option value="">(Select Supplier)</option>
                            {suppliers.map(mat => (
                                <option key={mat._id} value={mat.enterprise}>{mat.enterprise}</option>
                            ))}
                            <option value="add_new">➕ Add New Supplier</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="material">
                            Material <span className="required">*</span>
                        </label>
                        {/* <Select
                            id="material"
                            options={materialOptions}
                            value={material}
                            onChange={handleMaterialChange}
                        /> */}
                        <select
                            name="material"
                            value={bundleData.material}
                            onChange={(e) => {
                                if (e.target.value === 'add_new') {
                                    setShowAddMaterialModal(true);
                                } else {
                                    setBundleData({ ...bundleData, material: e.target.value });
                                }
                            }}
                        >
                            <option value="">(Select Material)</option>
                            {materials.map(mat => (
                                <option key={mat._id} value={mat.name}>{mat.name}</option>
                            ))}
                            <option value="add_new">➕ Add New Material</option>
                        </select>

                    </div>

                    <div className="form-row">
                        <div className="form-group half">
                            <label htmlFor="quality">
                                Quality <span className="required">*</span>
                            </label>
                            <Select
                                id="quality"
                                options={qualityOptions}
                                value={quality}
                                onChange={setQuality}
                                // className="form-select"
                                placeholder="Select Quality"
                            />
                        </div>

                        <div className="form-group half">
                            <label htmlFor="thickness">
                                Thickness <span className="required">*</span>
                            </label>
                            <Select
                                id="thickness"
                                options={thicknessOptions}
                                value={thickness}
                                onChange={setThickness}
                                // className="form-select"
                                placeholder="Select Thickness"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="finish">Finish</label>
                        <Select
                            id="finish"
                            options={finishOptions}
                            value={finish}
                            onChange={setFinish}
                            placeholder="Select Finish"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group half">
                            <label htmlFor="block">Block</label>
                            <input
                                type="text"
                                id="block"
                                className="form-input"
                                value={block}
                                onChange={(e) => setBlock(e.target.value)}
                            />
                        </div>

                        <div className="form-group half">
                            <label htmlFor="bundle">Bundle</label>
                            <input
                                type="text"
                                id="bundle"
                                className="form-input"
                                value={bundle}
                                onChange={(e) => setBundle(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group half">
                            <div className="checkbox-container">
                                <label htmlFor="priceSqMt">Price (Sq.Mt.)</label>
                                <div style={{ display: "flex", gap: '5px' }}>
                                    <input
                                        type="checkbox"
                                        id="self"
                                        checked={isSelf}
                                        onChange={() => setIsSelf(!isSelf)}
                                    />
                                    <label htmlFor="self">Self.</label>
                                </div>
                            </div>
                            <input
                                type="text"
                                id="priceSqMt"
                                className="form-input"
                                value={priceSqMt}
                                onChange={(e) => setPriceSqMt(e.target.value)}
                            />
                        </div>

                        <div className="form-group half">
                            <label htmlFor="priceSqFt">Price (Sq.Ft.)</label>
                            <input
                                type="text"
                                id="priceSqFt"
                                className="form-input"
                                value={priceSqFt}
                                onChange={(e) => setPriceSqFt(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group half">
                            <label htmlFor="oldPriceSqMt">Old Price (Sq.Mt.)</label>
                            <input
                                type="text"
                                id="oldPriceSqMt"
                                className="form-input"
                                value={oldPriceSqMt}
                                onChange={(e) => setOldPriceSqMt(e.target.value)}
                            />
                        </div>

                        <div className="form-group half">
                            <label htmlFor="oldPriceSqFt">Old Price (Sq.Ft.)</label>
                            <input
                                type="text"
                                id="oldPriceSqFt"
                                className="form-input"
                                value={oldPriceSqFt}
                                onChange={(e) => setOldPriceSqFt(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="tags">Tags</label>
                        <Select
                            id="tags"
                            options={tagOptions}
                            value={tags}
                            onChange={setTags}
                            isMulti
                            placeholder="Select Tags"
                        />
                    </div>

                    <div className="form-group">
                        <label>Availability</label>
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    value="available"
                                    checked={availability === 'available'}
                                    onChange={(e) => setAvailability(e.target.value)}
                                />
                                Available
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="on_hold"
                                    checked={availability === 'on_hold'}
                                    onChange={(e) => setAvailability(e.target.value)}
                                />
                                On Hold
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="sold"
                                    checked={availability === 'sold'}
                                    onChange={(e) => setAvailability(e.target.value)}
                                />
                                Sold
                            </label>
                        </div>
                    </div>
                </div>

                <div className="right-panel">
                    <div className="photos-section">
                        <div className="section-header">
                            <h2>Bundle Photos</h2>
                            <div className="photo-buttons">
                                <button className="btn-photo">
                                    <span className="icon">⬇</span> Photo Zip File
                                </button>
                                <button className="btn-select-photos">
                                    <span className="icon">📷</span> Select Photos
                                </button>
                            </div>
                        </div>
                        <p className="max-size">Maximum Size: 10 MB</p>
                        <div className="photo-upload-area">
                            <p className="no-photos">No Photos Attached</p>
                        </div>
                    </div>

                    <div className="statistic-section">
                        <h2>Statistic</h2>
                        <div className="stats-container">
                            <div className="stats-column">
                                <h3>Info</h3>
                                <div className="stat-item">
                                    <span>Slabs:</span>
                                    <span>0</span>
                                </div>
                                <div className="stat-item">
                                    <span>Days Stock:</span>
                                    <span>0</span>
                                </div>
                                <div className="stat-item">
                                    <span>Bundle Price Sq.Mt.:</span>
                                    <span>0.00</span>
                                </div>
                                <div className="stat-item">
                                    <span>Weight/M²:</span>
                                    <span>0.00</span>
                                </div>
                                <div className="stat-item">
                                    <span>Bundle Price Sq.Ft.:</span>
                                    <span>0.00</span>
                                </div>
                                <div className="stat-item">
                                    <span>Average Weight/M²:</span>
                                    <span>0.00</span>
                                </div>
                            </div>

                            <div className="stats-column">
                                <h3>Cost</h3>
                                <div className="stat-item">
                                    <span>Cost Sq.Mt.:</span>
                                    <span>0.00</span>
                                </div>
                                <div className="stat-item">
                                    <span>Cost Sq.Ft.:</span>
                                    <span>0.00</span>
                                </div>
                            </div>

                            <div className="stats-column">
                                <h3>Total</h3>
                                <div className="stat-item">
                                    <span>Total Sq.Mt.:</span>
                                    <span>0.000</span>
                                </div>
                                <div className="stat-item">
                                    <span>Total Sq.Ft.:</span>
                                    <span>0.000</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  
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

            {showAddSupplierModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3>Add New Supplier</h3>
                        <input
                            type="text"
                            value={newSupplierName}
                            onChange={(e) => setNewSupplierName(e.target.value)}
                            placeholder="Enter Supplier name"
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

export default BundleRegister;