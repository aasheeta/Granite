import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import BundleList from './Inventory/BundleList';
import BundleRegister from './Inventory/BundleRegister';
import BundleSettings from './Inventory/BundleSettings';
// import StockConference from './Inventory/StockConference';
import RegisterBlock from './Block/BlockRegister';
import BlockSettings from './Block/BlockSetting';
import BlockList from './Block/BlockList';
import LoginPage from './Login/LoginPage';
import { useAuth } from './contexts/AuthContext';
import './styles/App.css';
import RegisterSupplier from './Supplier/RegisterSupplier';
import SupplierList from './Supplier/SupplierList';
import RegisterMaterial from './materials/RegisterMaterial';
import MaterialList from './materials/MaterialList';
import MaterialSetting from './materials/MaterialSetting';
import Layout from './layout/Layout';
import OrderRegister from './Order/OrderRegister';
import OrderList from './Order/OrderList';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected */}
        <Route path="/*" element={
          <ProtectedRoute>
            <div className="app-container">
              <Layout />
              <div className="main-content">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="bundle-list" element={<BundleList />} />
                  <Route path="bundle-register" element={<BundleRegister />} />
                  {/* <Route path="stock-conference" element={<StockConference />} /> */}
                  <Route path="settings" element={<BundleSettings />} />
                  <Route path="block-register" element={<RegisterBlock />} />
                  <Route path="block-settings" element={<BlockSettings />} />
                  <Route path="block-list" element={<BlockList />} />
                   <Route path="supplier-register" element={<RegisterSupplier />} />
                    <Route path="supplier-list" element={<SupplierList />} />
                     <Route path="material-register" element={<RegisterMaterial />} />
                      <Route path="material-list" element={<MaterialList />} />
                       <Route path="material-setting" element={<MaterialSetting />} />
                        <Route path="order-register" element={<OrderRegister />} />
                      <Route path="order-list" element={<OrderList />} />
                </Routes>
              </div>
            </div>
          </ProtectedRoute>
        }/>
      </Routes>
    </Router>
  );
};

export default App;
