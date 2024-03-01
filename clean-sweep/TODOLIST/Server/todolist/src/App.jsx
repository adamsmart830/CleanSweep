import { useState } from 'react'
import './App.css'
import Home from './Home'

//app component, returns JSx, which represents the structure of the component.
//Home component rendered within a DIV, thus when 'App' is rendered, 'Home' 
//will also be rendered as a child component
function App() {
  

  return (
    //display component, displays whatever is in Home.jsx
    <div>
      <Home />
    </div>
  )
}

export default App