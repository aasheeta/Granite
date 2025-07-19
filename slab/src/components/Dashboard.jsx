// components/Dashboard.jsx
import React from 'react';
import '../styles/Dashboard.css';
import { FaUsers, FaShoppingCart, FaChartLine, FaUserPlus } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* <div className="toast">Your email is not configured</div> */}

      <div className="dashboard-cards">
        <div className="card purple">
          <FaChartLine className="card-icon" />
          <div className="card-label">Total Available Slabs (Sq.Ft)</div>
          {/* Total sqft of the available bundle of slabs. Sum of available bundle sqfts. */}
          <div className="card-value">12,000</div>
        </div>
        <div className="card orange">
          <FaShoppingCart className="card-icon" />
          <div className="card-label">Blocks Count in Gantry</div>
          {/* Get Blocks with status in Gantry */}
          <div className="card-value">350</div>
        </div>
        <div className="card blue">
          <FaUserPlus className="card-icon" />
          <div className="card-label">Total Customers</div>
          <div className="card-value">120</div>
        </div>
        <div className="card green">
          <FaUsers className="card-icon" />
          <div className="card-label"> Orders / Month</div>
          {/* New orders created in the last 30 days */}
          <div className="card-value">90</div>
        </div>
      </div>

      <div className="section bundle-panel">
        <h3>Bundles Panel</h3>
        <div className="bundle-boxes">
          <div className="bundle-box available">
            <p className="bundle-count">542</p>
            <p className="bundle-label">Available</p>
          </div>
          <div className="bundle-box hold">
            <p className="bundle-count">132</p>
            <p className="bundle-label">On Hold</p>
          </div>
          <div className="bundle-box sold">
            <p className="bundle-count">93</p>
            <p className="bundle-label">Sold</p>
          </div>
          {/* <div className="bundle-box reserved">
            <p className="bundle-count">18</p>
            <p className="bundle-label">Reserved</p>
          </div> */}
          {/* <div className="bundle-box returned">
            <p className="bundle-count">15</p>
            <p className="bundle-label">Returned</p>
          </div> */}
        </div>
      </div>


      <div className="section sellers-panel">
        <h3>Best Seller Materials</h3>
        <div className="best-sellers-list">
          <div className="seller-box">Material A</div>
          <div className="seller-box">Material B</div>
          <div className="seller-box">Material C</div>

        </div>

        <h3 style={{ marginTop: '30px' }}>Top Materials in Stock</h3>
        <ul className="stock-materials">
          {/* Calculate total bundle available in stock, and categorize basis the material name and display the top 3 below (with sqft) */}
          <li>Granite X</li>
          <li>Quartz Y</li>
          <li>Marble Z</li>
        </ul>
      </div>


      {/* <div className="section">
        <h3>Messages</h3>
        <p>You have 3 new messages.</p>
      </div> */}
    </div>
  );
};

export default Dashboard;
