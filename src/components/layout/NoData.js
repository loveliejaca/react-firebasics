import React from "react"

const  NoData = ({msg}) => {
  return (
    <div className="no-data">
      <div className="no-data-spaceship">
        <div className="no-data-spaceship-dot">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="no-data-spaceship-boost">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="no-data-msg">
        {msg}
      </div>
    </div>
  )
}
export default NoData
