import React, { useState, useEffect, useRef } from "react"
import Moon from "../../components/monster/Moon"
const  Loading = () => {

  return (
    <div className="loading">
      <div className="loading-astro-box">
        <div className="loading-astro"></div>
      </div>

      <div className="loading-bar"></div>
    </div>
  )
}
export default Loading
// <div className="loading-page-txt">
// <span>Loading...</span>
// </div>
