import React, { useState } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signIn } from '../../store/actions/authActions'
import { Link, useHistory } from "react-router-dom"

import Spaceship from "../monster/Spaceship"
// import ButtonLoading from "../layout/ButtonLoading"

const SignIn = (props) => {
  const { authError } = props;

  const [state, setState] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const error = authError

  function handleChange(e) {
    setState({
      ...state,
      [e.target.id]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    props.signIn(state, (res) => {
      setLoading(true)

      if(res) {
        console.log("res", res);
        history.push('/profile')
      }
    })

    setLoading(false)
  }

  return (
    <div className="auth auth-login">
      <h1 className="auth-title">Login</h1>
      <div className="auth-inner">
        {error && <div className="form-error"> {error}</div> }
        <div className="form">
          <form action="" onSubmit={handleSubmit}>
            <div className="form-input">
              <label htmlFor="email">Email</label>
              <div className="form-inputbox">
                <input type="email" id='email' onChange={handleChange} required/>
              </div>
            </div>

            <div className="form-input">
              <label htmlFor="password">Password</label>
              <div className="form-inputbox">
                <input id="password" type="password" minLength="6"  onChange={handleChange} required/>
              </div>
            </div>

            <div className="form-btn">
              <button disabled={loading} type="submit" className="cmn-btn cmn-btn-submit">
              <span>Login</span>

              </button>
            </div>
          </form>




        </div>

        <div className="auth-other">
           <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        <div className="auth-other">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>

      <div className="spaceship-box spaceship-box-login">
        <Spaceship scale={0.5} />
      </div>
    </div>
  )
}

// export default Login

const mapStateToProps = (state) => {
  return{
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: bindActionCreators(signIn, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)


// {error && <div className="auth-alert"><span>{error}</span></div>}
