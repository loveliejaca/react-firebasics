import React from "react"


const  MonsterPoo = ({scale}) => {

  return (
    <div className="monster-poo" style={{  transform: `scale(${scale})` }}>
    <div className="monster-poo-hair"></div>
    <div className="monster-poo-horn">
      <span className="horn-left">
        <span></span>
      </span>
      <span className="horn-right">
        <span></span>
      </span>
    </div>
    <div className="monster-poo-eye">
      <span></span>
    </div>
    <div className="monster-poo-mouth">
      <span></span>
      <div className="monster-poo-teeth"></div>
      <div className="monster-poo-teeth -right"> </div>
      <div className="monster-poo-tounge"></div>
    </div>
    <div className="monster-poo-feet"></div>
    <div className="monster-poo-hands">
      <div className="hands">
        <div className="hands-inner">
          <span></span>
          <div className="hand-paw">
            <span></span>
          </div>
        </div>
      </div>
      <div className="hands -right">
        <div className="hands-inner">
          <span></span>
          <div className="hand-paw">
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default MonsterPoo
