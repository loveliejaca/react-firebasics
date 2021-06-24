import React from "react"

const  Moon = ({scale}) => {
  return (
    <div className="moon" style={{  transform: `scale(${scale})` }}>
      <div className="moon-inner">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}
export default Moon
