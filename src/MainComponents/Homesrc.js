import React from 'react'
import Home_Top from '../Components/Home_Top'
import Home_Front from '../Components/Home_Front'
import Home from "../Components/Home"
import Home_Bottom from '../Components/Home_Bottom'
import './HomeMain.css';

export default function Homesrc() {
  return (
    <div style={{ overflowY: 'scroll', height: 'calc(100vh - 127px)' }}>
      <Home_Top />
     <Home_Front />
     <Home />
     <Home_Bottom />
     
    </div>
  )
}