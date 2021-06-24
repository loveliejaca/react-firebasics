import React from "react"

const  Spaceship = ({scale}) => {
  return (
    <div className="spaceship" style={{  transform: `scale(${scale})` }}>
      <div className="spaceship-inner">
        <div className="spaceship-shake">
          <div className="spaceship-wing">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="spaceship-antena">
          <span></span>
          </div>
          <div className="spaceship-legs">
            <span>
              <span></span>
            </span>
            <span>
              <span></span>
            </span>
            <span>
              <span></span>
            </span>
          </div>
        </div>
      </div>
    </div>

  )
}
export default Spaceship
