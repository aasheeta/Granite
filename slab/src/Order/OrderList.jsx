import React, { useEffect, useState } from 'react';
import './OrderList.css';
import API from '../api';
import { PlusCircle, Search } from 'lucide-react';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    API.get('/api/orders')
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch orders:', err);
      });
  }, []);

  const filteredOrders = orders.filter((order) =>
    order.customerName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bundle-list-container">
      <div className="bundle-list-header">
        <h2>Order List</h2>
        <button className="new-button">
          <PlusCircle size={16} />
          New Order
        </button>
      </div>

      <div className="filter-container">
        <div className="filter-row">
          <div className="filter-item">
            <label>Search Customer</label>
            <div style={{ position: 'relative' }}>
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="e.g. John"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: '32px' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table View */}
      <table className="bundle-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Order Date</th>
            <th>Bundles</th>
            <th>Thickness</th>
            <th>Finish</th>
            <th>Status</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order._id}>
              <td>{order.customerName}</td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td>{order.bundles.map((b) => b.bundle || '-').join(', ')}</td>
              <td>{order.bundles.map((b) => b.thickness || '-').join(', ')}</td>
              <td>{order.bundles.map((b) => b.finish || '-').join(', ')}</td>
              <td>
                {order.bundles.length > 0 ? (
                  order.bundles.map((b, i) => (
                    <span
                      key={i}
                      className={`status-pill status-${(b.status || 'available').toLowerCase()}`}
                    >
                      {b.status || 'available'}
                    </span>
                  ))
                ) : (
                  <span className="status-pill status-available">N/A</span>
                )}
              </td>
              <td>{order.notes || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile View */}
      {/* <div className="bundle-card-grid">
        {filteredOrders.map((order) => (
          <div className="bundle-card" key={order._id}>
            <h3>{order.customerName}</h3>
            <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
            <p><strong>Bundles:</strong> {order.bundles.map((b) => b.bundle || '-').join(', ')}</p>
            <p><strong>Thickness:</strong> {order.bundles.map((b) => b.thickness || '-').join(', ')}</p>
            <p><strong>Finish:</strong> {order.bundles.map((b) => b.finish || '-').join(', ')}</p>
            <p><strong>Status:</strong> 
              {order.bundles.length > 0 ? (
                order.bundles.map((b, i) => (
                  <span
                    key={i}
                    className={`status-pill status-${(b.status || 'available').toLowerCase()}`}
                    style={{ marginRight: '5px' }}
                  >
                    {b.status || 'available'}
                  </span>
                ))
              ) : (
                <span className="status-pill status-available">N/A</span>
              )}
            </p>
            <p><strong>Notes:</strong> {order.notes || '-'}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default OrderList;
