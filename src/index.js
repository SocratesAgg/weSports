// index.js (or main.js, depending on your entry file)
import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18 uses createRoot
import { BrowserRouter as Router } from 'react-router-dom';  // Import BrowserRouter here
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App />
  </Router>
);

export default root;