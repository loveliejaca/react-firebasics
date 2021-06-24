import React from "react"
import { Link } from "react-router-dom"
import logo from '../assets/images/splanner.png';

import MonsterLala from "./monster/MonsterLala"
import Moon from "./monster/Moon"


const Homepage = () => {

  return (
    <React.Fragment>
      <main className="l-main intro">
        <div className="moon-box moon-box-home">
          <div className="monster-box monster-box-home"><MonsterLala scale={0.3} /></div>
          <Moon scale={0.65}/>
        </div>

        <div className="intro-dtl">
          <h2 className="intro-title">
            <img src={logo} alt="Splanner"/>
          </h2>
          <p>Mood your life with a Planner!</p>

          <Link to="/login">
            <span>Let's Get Started </span>
            <i className="intro-arrow"></i>
          </Link>
        </div>
      </main>
    </React.Fragment>
  )
}

export default Homepage
