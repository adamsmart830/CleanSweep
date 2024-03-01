
/*
entry point for the React application. Renders main component of the 
application, 'App,' into the DOM, wrapped in <React.StrictMode> to activate 
additional checks and warnings for components
*/
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
