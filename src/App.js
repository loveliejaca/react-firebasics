import React from "react"
// import { AuthProvider } from "./contexts/AuthContext";
// import { UserProvider } from "./contexts/UserContext";
// import { ScheduleProvider } from "./contexts/ScheduleContext";
import { BrowserRouter as Router, Route } from "react-router-dom"
import PrivateRoute from "./components/PrivateRoute"

import SignUp from "./components/auth/Signup"
import SignIn from "./components/auth/Signin"
import ForgotPassword from "./components/auth/ForgotPassword"

import Homepage from "./components/Homepage"
import Galaxy from "./components/Galaxy"

import UpdateProfile from "./components/profile/UpdateProfile"

import Profile from "./components/profile/Profile"
// import CreateEvent from "./components/event/CreateEvent"
// import Menu from "./components/layout/Menu"



import PrivacyPolicy from "./components/pages/PrivacyPolicy"

import './assets/styles/style.scss'

function App() {

  return (
    <div className="l-wrapper color-1">
      <Galaxy />
      <Router>
        <Route exact path="/" component = {Homepage} />
        <Route path="/signup" component = {SignUp} />
        <Route path="/login" component = {SignIn} />
        <Route path="/forgot-password" component = {ForgotPassword} />

        <Route path="/privacy-policy" component = {PrivacyPolicy} />

        <PrivateRoute path="/profile" component = {Profile}/>
        <PrivateRoute path="/update-profile" component = {UpdateProfile}/>
      
      </Router>

    </div>

  )
}

export default App;

// <Router>
//   <AuthProvider>
//         <Galaxy />
//         <Switch>
//           <Route exact path="/" component = {Homepage} />
//           <Route path="/signup" component = {Signup} />
//           <Route path="/login" component = {Login} />
//           <Route path="/forgot-password" component = {ForgotPassword} />
//           <Route path="/privacy-policy" component = {PrivacyPolicy} />
//
//
//           <PrivateRoute path="/update-profile" component = {UpdateProfile} />
//           <PrivateRoute path="/profile" component = {Profile} />
//           <PrivateRoute path="/create-event" component = {CreateEvent} />
//         </Switch>
//   </AuthProvider>
// </Router>
