import React, { useState } from 'react';
import './Plate.css';

const PlateList = ({plates, setPlates}) => {
  const [showModal, setShowModal] = useState(false);
//   const [plates, setPlates] = useState([]);
  const [calculateAutomatically, setCalculateAutomatically] = useState(true);
  const [formData, setFormData] = useState({
    initialPlate: '',
    numberOfPlates: '1',
    widthSqMt: '',
    heightSqMt: '',
    widthSqFt: '',
    heightSqFt: '',
    selfCalculate: true
  });

  const handleNewClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      initialPlate: '',
      numberOfPlates: '1',
      widthSqMt: '',
      heightSqMt: '',
      widthSqFt: '',
      heightSqFt: '',
      selfCalculate: true
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
      return;
    }

    // Handle automatic conversion between sq.mt and sq.ft
    let updatedData = { [name]: value };
    
    if (name === 'widthSqMt' && value !== '' && !isNaN(value)) {
      const sqFtValue = (parseFloat(value) * 10.764).toFixed(2);
      updatedData.widthSqFt = sqFtValue;
    } else if (name === 'widthSqFt' && value !== '' && !isNaN(value)) {
      const sqMtValue = (parseFloat(value) / 10.764).toFixed(2);
      updatedData.widthSqMt = sqMtValue;
    } else if (name === 'heightSqMt' && value !== '' && !isNaN(value)) {
      const sqFtValue = (parseFloat(value) * 10.764).toFixed(2);
      updatedData.heightSqFt = sqFtValue;
    } else if (name === 'heightSqFt' && value !== '' && !isNaN(value)) {
      const sqMtValue = (parseFloat(value) / 10.764).toFixed(2);
      updatedData.heightSqMt = sqMtValue;
    }

    setFormData(prev => ({
      ...prev,
      ...updatedData
    }));
  };

  const handleSave = () => {
    // Generate plates based on the number of plates input
    const numberOfPlates = parseInt(formData.numberOfPlates);
    const newPlates = [];
    
    for (let i = 0; i < numberOfPlates; i++) {
      const plateNumber = `${formData.initialPlate}${i + 1}`;
      const widthSqMt = parseFloat(formData.widthSqMt) || 0;
      const heightSqMt = parseFloat(formData.heightSqMt) || 0;
      const widthSqFt = parseFloat(formData.widthSqFt) || 0;
      const heightSqFt = parseFloat(formData.heightSqFt) || 0;
      
      const totalSqMt = widthSqMt * heightSqMt;
      const totalSqFt = widthSqFt * heightSqFt;
      
      newPlates.push({
        id: Date.now() + i,
        number: plateNumber,
        widthFt: widthSqFt.toFixed(2),
        heightFt: heightSqFt.toFixed(2),
        totalSqFt: totalSqFt.toFixed(3),
        selected: false
      });
    }
    
    // Add new plates to the existing plates array
    setPlates(prevPlates => [...prevPlates, ...newPlates]);
    handleCloseModal();
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setPlates(prevPlates => 
      prevPlates.map(plate => ({ ...plate, selected: isChecked }))
    );
  };

  
  const handleCalculateAutomatically = (e) => {
    setCalculateAutomatically(e.target.checked);
  };


  const handleSelectPlate = (plateId) => {
    setPlates(prevPlates => 
      prevPlates.map(plate => 
        plate.id === plateId ? { ...plate, selected: !plate.selected } : plate
      )
    );
  };

//   const handleSave = async () => {
//   try {
//     const response = await fetch('/api/plates', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData)
//     });
//     const newPlates = await response.json();
//     setPlates(prevPlates => [...prevPlates, ...newPlates]);
//   } catch (error) {
//     console.error('Error saving plates:', error);
//   }
// };

  const handlePlateValueChange = (plateId, field, value) => {
    setPlates(prevPlates => 
      prevPlates.map(plate => {
        if (plate.id === plateId) {
          const updatedPlate = { ...plate, [field]: value };
          
          // Recalculate totals if width or height changes
          if (field === 'widthM' || field === 'heightM') {
            const widthM = parseFloat(field === 'widthM' ? value : plate.widthM) || 0;
            const heightM = parseFloat(field === 'heightM' ? value : plate.heightM) || 0;
            updatedPlate.totalSqMt = (widthM * heightM).toFixed(3);

             if (field === 'widthFt' || field === 'heightFt') {
  const widthFt = parseFloat(field === 'widthFt' ? value : plate.widthFt) || 0;
  const heightFt = parseFloat(field === 'heightFt' ? value : plate.heightFt) || 0;
            
            // Also update feet values
            updatedPlate.widthFt = (widthM * 10.764).toFixed(2);
            updatedPlate.heightFt = (heightM * 10.764).toFixed(2);
            updatedPlate.totalSqFt = (widthM * heightM * 10.764 * 10.764).toFixed(3);
             }
          }
          
          return updatedPlate;
        }
        return plate;
      })
    );
  };

  return (
    <div className="plate-app">
      <div className="main-container">
        <div className="header">
          <h2>List of Plates</h2>
          <div className="header-actions">
            <button className="btn btn-primary" onClick={handleNewClick}>
              + New
            </button>
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle">
                Actions
              </button>
            </div>
          </div>
        </div>

        {/* <div className="toolbar">
          <button className="btn btn-gray">Update All</button>
          <button className="btn btn-gray">Add Photo</button>
          <button className="btn btn-gray">Reset Weight</button>
          <div className="calculate-checkbox">
            <input
              type="checkbox"
              id="calculateAuto"
              checked={calculateAutomatically}
              onChange={handleCalculateAutomatically}
            />
            <label htmlFor="calculateAuto">Calculate Automatically</label>
          </div>
        </div> */}

        <div className="content-area">
          {plates.length === 0 ? (
            <div className="no-records">
              There is no record or no record was found.
            </div>
          ) : (
            <div className="plates-table">
              <table>
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={plates.length > 0 && plates.every(plate => plate.selected)}
                      />
                    </th>
                    <th>Number</th>
                    <th>Width (Sq.Ft)</th>
                    <th>Height (Sq.Ft))</th>
                    {/* <th>Total Sq.Mt.</th>
                    <th>Width (")</th>
                    <th>Height (")</th> */}
                    <th>Total Sq.Ft.</th>
                    {/* <th>Weight</th> */}
                    {/* <th>Options</th> */}
                  </tr>
                </thead>
                <tbody>
                  {plates.map((plate) => (
                    <tr key={plate.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={plate.selected}
                          onChange={() => handleSelectPlate(plate.id)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={plate.number}
                          onChange={(e) => handlePlateValueChange(plate.id, 'number', e.target.value)}
                          className="table-input"
                        />
                      </td>
                      {/* <td>
                        <input
                          type="number"
                          value={plate.widthM}
                          onChange={(e) => handlePlateValueChange(plate.id, 'widthM', e.target.value)}
                          className="table-input"
                          step="0.01"
                        />
                      </td> */}
                      {/* <td>
                        <input
                          type="number"
                          value={plate.heightM}
                          onChange={(e) => handlePlateValueChange(plate.id, 'heightM', e.target.value)}
                          className="table-input"
                          step="0.01"
                        />
                      </td> */}
                          {/* <td className="calculated-field">{plate.totalSqMt}</td> */}
                          <td ><input
                              type="number"
                              value={plate.widthFt}
                              onChange={(e) => handlePlateValueChange(plate.id, 'widthFt', e.target.value)}
                              className="table-input"
                              step="0.01"
                          /></td>
                          <td >  <input
                              type="number"
                              value={plate.heightFt}
                              onChange={(e) => handlePlateValueChange(plate.id, 'heightFt', e.target.value)}
                              className="table-input"
                              step="0.01"
                          /></td>
                      <td className="calculated-field">{plate.totalSqFt}</td>
                      {/* <td>
                        <input
                          type="number"
                          value={plate.weight}
                          onChange={(e) => handlePlateValueChange(plate.id, 'weight', e.target.value)}
                          className="table-input"
                          step="0.01"
                        />
                      </td> */}
                      {/* <td>
                        <div className="options-buttons">
                          <button className="btn-icon" title="View">📋</button>
                          <button className="btn-icon" title="Edit">✏️</button>
                          <button className="btn-icon" title="More">⋮</button>
                        </div>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* <div className="footer">
          <button className="btn btn-primary">Print Label</button>
        </div> */}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Register Plates</h3>
              <button className="close-btn" onClick={handleCloseModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-row-plate">
                <div className="form-group">
                  <label>
                    Initial Plate <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="initialPlate"
                    value={formData.initialPlate}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>
                    Number of Plates <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="numberOfPlates"
                    value={formData.numberOfPlates}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-row-plate">
                <div className="form-group">
                     <label>
                    Height (Sq.Ft.) <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="heightSqFt"
                    value={formData.heightSqFt}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                  {/* <label>
                    Width (Sq.Mt.) <span className="required">*</span>
                  </label> */}
                  <div className="input-with-checkbox">
                    {/* <input
                      type="text"
                      name="widthSqMt"
                      value={formData.widthSqMt}
                      onChange={handleInputChange}
                      className="form-control"
                    /> */}
                    {/* <div className="checkbox-container">
                      <input
                        type="checkbox"
                        id="selfCalculate"
                        name="selfCalculate"
                        checked={formData.selfCalculate}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="selfCalculate">Self.</label>
                    </div> */}
                  </div>
                </div>
                <div className="form-group">
                  <label>
                    Width (Sq.Ft.) <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="widthSqFt"
                    value={formData.widthSqFt}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
              </div>
{/* 
              <div className="form-row">
                
                <div className="form-group">
                  <label>
                    Height (Sq.Ft.) <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="heightSqFt"
                    value={formData.heightSqFt}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
              </div> */}
            </div>

            <div className="modal-footer">
              <button className="btn btn-gray" onClick={handleCloseModal}>
                To go back
              </button>
              <button className="btn btn-teal" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlateList;