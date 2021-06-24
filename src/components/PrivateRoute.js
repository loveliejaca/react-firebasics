import React, { useState, useEffect } from "react"
import { Route, Redirect } from "react-router-dom"

import { connect, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUser } from './../store/actions/userActions'

import Loading from "./../components/layout/Loading"

const PrivateRoute =({component: Component, ...rest }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [loading, setLoading] = useState(true)
  const user = useSelector(state => state.auth.currentUser);

  useEffect(() => {
    console.log('user', user);
    if(user) {
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [user])


  return (
    <Route
     {...rest}
     render={ props => {
       return loading ? <Loading /> : currentUser ? <Component {...props}/> : <Redirect to='/login' />
     }}
    >
    </Route>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: bindActionCreators(getUser, dispatch)
  }
}

export default connect(null, null)(PrivateRoute)
