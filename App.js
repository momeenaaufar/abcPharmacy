import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  // State for managing items
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [itemType, setItemType] = useState('');

  // State for managing invoices
  const [invoices, setInvoices] = useState([]);
  const [invoiceName, setInvoiceName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  // Function to add an item
  const addItem = () => {
    if (itemName && unitPrice && itemType) {
      const newItem = {
        name: itemName,
        unitPrice,
        itemType,
      };
      setItems([...items, newItem]);
      // Clear input fields
      setItemName('');
      setUnitPrice('');
      setItemType('');
    } else {
      alert('Please enter all item details');
    }
  };

  // Function to edit an item
  const editItem = (index) => {
    // Implement your logic to edit an item
    // You can open a modal or navigate to a new page for editing
    console.log('Edit item at index', index);
  };

  // Function to delete an item
  const deleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  // Function to add an invoice
  const addInvoice = () => {
    if (invoiceName && mobileNo && email && address) {
      const newInvoice = {
        name: invoiceName,
        mobileNo,
        email,
        address,
      };
      setInvoices([...invoices, newInvoice]);
      // Clear input fields
      setInvoiceName('');
      setMobileNo('');
      setEmail('');
      setAddress('');
    } else {
      alert('Please enter all invoice details');
    }
  };

  // Function to edit an invoice
  const editInvoice = (index) => {
    // Implement your logic to edit an invoice
    // You can open a modal or navigate to a new page for editing
    console.log('Edit invoice at index', index);
  };

  // Function to delete an invoice
  const deleteInvoice = (index) => {
    const updatedInvoices = [...invoices];
    updatedInvoices.splice(index, 1);
    setInvoices(updatedInvoices);
  };

  const handleLogin = () => {
    if (username && password) {
      setLoggedIn(true);
    } else {
      alert('Please enter both username and password');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div className="App">
      {loggedIn ? (
        <div>
          <div className="front_sub">
            <h1>ABC Pharmacy</h1>
          </div>

          <div className="second">
            <div className="text_1">
              <h2>Items</h2>
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                id="name"
                placeholder="Type item name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <br></br>
              <br></br>
              <label htmlFor="name">Unit Price: </label>
              <input
                type="text"
                id="Unit_price"
                placeholder="Type Unit_price"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
              />
              <br></br>
              <br></br>
              <label htmlFor="name">Item Type: </label>
              <input
                type="text"
                id="item_type"
                placeholder="Type your type"
                value={itemType}
                onChange={(e) => setItemType(e.target.value)}
              />
              <br></br>
              <br></br>
              <button onClick={addItem}>Add Item</button>

              {/* Display the list of items */}
              <ul>
                {items.map((item, index) => (
                  <li key={index}>
                    {item.name} - ${item.unitPrice} - {item.itemType}{' '}
                    <button onClick={() => editItem(index)}>Edit</button>
                    <button onClick={() => deleteItem(index)}>Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="third">
            <div className="text1">
              <h2>Invoices</h2>
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                id="name"
                placeholder="Type your name"
                value={invoiceName}
                onChange={(e) => setInvoiceName(e.target.value)}
              />
              <br></br>
              <br></br>
              <label htmlFor="name">Mobile No: </label>
              <input
                type="numeric"
                id="Mobile_no"
                placeholder="Type Mobile_no"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
              <br></br>
              <br></br>
              <label htmlFor="name">Email: </label>
              <input
                type="email"
                id="email"
                placeholder="Type email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br></br>
              <br></br>
              <label htmlFor="name">Address: </label>
              <input
                type="text"
                id="address"
                placeholder="Type your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <br></br>
              <br></br>
              <button onClick={addInvoice}>Add Invoice</button>

              {/* Display the list of invoices */}
              <ul>
                {invoices.map((invoice, index) => (
                  <li key={index}>
                    {invoice.name} - {invoice.mobileNo} - {invoice.email} -{' '}
                    {invoice.address}{' '}
                    <button onClick={() => editInvoice(index)}>Edit</button>
                    <button onClick={() => deleteInvoice(index)}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Navigation links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link1" href="#">
                  SERVICES
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link2" href="#">
                  ABOUT US
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link3" href="#">
                  CONTACT US
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="loginpage">
          <h2>Login</h2>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default App;
