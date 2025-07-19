import React, { useState } from 'react';
import '../styles/Sidebar.css';
import { useAuth } from '../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  FaBoxes, 
  FaShoppingCart, 
  FaTruck,
  FaCubes,
  FaCube,
  FaClipboardList,
  FaPlusSquare,
  FaCogs,
  FaChartBar,
  FaChevronDown,
  FaChevronUp,
  FaQuestionCircle,
  FaTachometerAlt,
  FaLayerGroup,
  FaDownload
} from 'react-icons/fa';

const Sidebar = ({closeSidebar }) => {
   const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // State to track which menus are expanded
  const [expandedMenus, setExpandedMenus] = useState({
    inventory: true,
    orders: false,
    preBooking: false,
    clients: false,
    mailing: false,
    newsletter: false,
    suppliers: false,
    materials: false,
    block: false,
    reports: false,
    users: false,
    website: false
  });

  // Your existing inventory menu items
  const inventoryItems = [
    { id: 'bundle-list', path: '/bundle-list', label: 'Bundle List', icon: <FaClipboardList size={14} /> },
    { id: 'new', path: '/bundle-register', label: 'New', icon: <FaPlusSquare size={14} /> },
    // { id: 'settings', path: '/settings', label: 'Settings', icon: <FaCogs size={14} /> },
    { id: 'dashboard', path: '/', label: 'Dashboard', icon: <FaTachometerAlt size={14} /> },
    // { id: 'controls', path: '/controls', label: 'Controls', icon: <FaBoxes size={14} /> },
    // { id: 'stock-conference', path: '/stock-conference', label: 'Stock Conference', icon: <FaLayerGroup size={14} /> },
    { id: 'import-bundles', path: '/import-bundles', label: 'Import Bundles', icon: <FaDownload size={14} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page
  }; 

  // Menu structure matching the screenshot
  const menuItems = [
    {
      id: 'inventory',
      label: 'Inventory',
      icon: <FaBoxes size={18} />,
      expanded: expandedMenus.inventory,
      submenu: inventoryItems
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: <FaShoppingCart size={18} />,
      expanded: expandedMenus.orders,
      submenu: [
        { id: 'order-list', path: '/order-list', label: 'Order List', icon: <FaClipboardList size={14} /> },
        { id: 'order-register', path: '/order-register', label: 'New', icon: <FaPlusSquare size={14} /> },
      ]
    },
    // {
    //   id: 'preBooking',
    //   label: 'Pre-Booking',
    //   icon: <FaCalendarCheck size={18} />,
    //   expanded: expandedMenus.preBooking,
    //   submenu: []
    // },
    // {
    //   id: 'clients',
    //   label: 'Clients',
    //   icon: <FaUsers size={18} />,
    //   expanded: expandedMenus.clients,
    //   submenu: []
    // },
    // {
    //   id: 'mailing',
    //   label: 'Mailing',
    //   icon: <FaEnvelope size={18} />,
    //   expanded: expandedMenus.mailing,
    //   submenu: []
    // },
    // {
    //   id: 'newsletter',
    //   label: 'Newsletter',
    //   icon: <FaNewspaper size={18} />,
    //   expanded: expandedMenus.newsletter,
    //   submenu: []
    // },
    {
      id: 'suppliers',
      label: 'Suppliers',
      icon: <FaTruck size={18} />,
      expanded: expandedMenus.suppliers,
      submenu: [
        { id: 'supplier-list', path: '/supplier-list', label: 'Supplier List', icon: <FaClipboardList size={14} /> },
        { id: 'supplier-register', path: '/supplier-register', label: 'New', icon: <FaPlusSquare size={14} /> },
        // { id: 'settings', path: '/supplier-setting', label: 'Settings', icon: <FaCogs size={14} /> }
      ]
    },
    {
      id: 'materials',
      label: 'Materials',
      icon: <FaCubes size={18} />,
      expanded: expandedMenus.materials,
       submenu: [
        { id: 'material-list', path: '/material-list', label: 'Material List', icon: <FaClipboardList size={14} /> },
        { id: 'material-register', path: '/material-register', label: 'New', icon: <FaPlusSquare size={14} /> },
        // { id: 'settings', path: '/material-setting', label: 'Settings', icon: <FaCogs size={14} /> }
      ]
    },
    {
      id: 'block',
      label: 'Block',
      icon: <FaCube size={18} />,
      expanded: expandedMenus.block,
      submenu: [
        { id: 'block-list', path: '/block-list', label: 'Block List', icon: <FaClipboardList size={14} /> },
        { id: 'new', path: '/block-register', label: 'New', icon: <FaPlusSquare size={14} /> },
        // { id: 'settings', path: '/block-settings', label: 'Settings', icon: <FaCogs size={14} /> }
      ]
    },
    {
      id: 'reports',
      label: 'Reports (Premium)',
      icon: <FaChartBar size={18} />,
      expanded: expandedMenus.reports,
      submenu: []
    },
    // {
    //   id: 'users',
    //   label: 'Users',
    //   icon: <FaUserFriends size={18} />,
    //   expanded: expandedMenus.users,
    //   submenu: []
    // },
    // {
    //   id: 'website',
    //   label: 'Website',
    //   icon: <FaGlobe size={18} />,
    //   expanded: expandedMenus.website,
    //   submenu: []
    // }
  ];

  const toggleMenu = (menuId) => {
    setExpandedMenus({
      ...expandedMenus,
      [menuId]: !expandedMenus[menuId]
    });
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
     
    <div className="sidebar">
     <div className="sidebar-top">
      <div className="button-close">
      <button className="close-sidebar" onClick={closeSidebar}>
          &times;
        </button>
        </div>
       <p className="need-help">
          <span className="help-icon"><FaQuestionCircle /></span> Need Help?
        </p>
        {/* <a href="#" className="go-website">Go to Website</a>
        <a href="#" className="videos-link">Videos</a> */}
        <p className="date">May 16, 2025</p>
        <span className="flag">🇧🇷</span>
      
      </div> 

      <div className="sidebar-menu">
        {menuItems.map((menu) => (
          <div key={menu.id} className="menu-group">
            <div 
              className={`menu-header ${expandedMenus[menu.id] ? 'expanded' : ''}`} 
              onClick={() => toggleMenu(menu.id)}
            >
              <div className="menu-icon">{menu.icon}</div>
              <span className="menu-label">{menu.label}</span>
              <div className="expand-icon">
                {expandedMenus[menu.id] ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
              </div>
            </div>
            
            {expandedMenus[menu.id] && menu.submenu.length > 0 && (
              <ul className="submenu">
                {menu.submenu.map((item) => (
                  <li
                    key={item.id}
                    className={currentPath === item.path ? 'active' : ''}
                    onClick={() => handleNavigation(item.path)}
                  >
                    <div className="submenu-icon">{item.icon}</div>
                    <span className="submenu-label">{item.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      <div className="sidebar-top">
        {/* <p className="need-help">
          <span className="help-icon"><FaQuestionCircle /></span> Need Help?
        </p>
        <a href="#" className="go-website">Go to Website</a>
        <a href="#" className="videos-link">Videos</a>
        <p className="date">May 16, 2025</p>
        <span className="flag">🇧🇷</span>*/}
        <div style ={{marginTop:'10px'}}> 
        <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
      </div>
      </div>
    </div>
   
  );
};

export default Sidebar;